import { Component, ViewChild, AfterViewInit, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form-service';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { Chart, registerables } from 'chart.js';
import { FormResponseData } from '../../interfaces/form-response-schema';
import { ToastrService } from 'ngx-toastr';

Chart.register(...registerables);
const C_PRIMARY = '#6750A4';
const C_PRIMARY_SOFT = '#E8DEF8';
const C_MUTED = '#79747E';
const C_GRID = 'rgba(0,0,0,0.06)';

@Component({
  selector: 'app-form-response',
  standalone: true,
  imports: [
    MatTableModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './form-response.html',
  styleUrl: './form-response.css',
})
export class FormResponse implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['slNo', 'submittedAt'];
  dataSource = new MatTableDataSource<Record<string, any>>([]);
  isLoading = true;
  hasData = false;
  formTitle = '';
  fieldLabelMap: Record<string, string> = {};
  completionChartSubtitle = '';

  private completionChart: Chart | null = null;
  private timelineChart: Chart | null = null;
  private weekdayChart: Chart | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('completionCanvas') completionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timelineCanvas') timelineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('weekdayCanvas') weekdayCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.fetchData(id);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.completionChart?.destroy();
    this.timelineChart?.destroy();
    this.weekdayChart?.destroy();
  }

  fetchData(id: string): void {
    forkJoin({
      form: this.formService.getFormById(id),
      responses: this.formService.getAllFormResponsesById(id),
      respondents: this.formService.getUniqueRespondentsByFormId(id),
      assignees: this.formService.getUniqueAssigneesByFormId(id),
    }).subscribe({
      next: ({ form, responses, respondents, assignees }) => {
        this.isLoading = false;
        this.formTitle = form.title;
        const useResponseMode = assignees.count === 0;
        this.completionChartSubtitle = useResponseMode
          ? 'Unique responders out of total submissions'
          : 'Unique respondents out of assigned users';

          console.log("Assignees:" + assignees.count);
          console.log("Unique Repondants:" + respondents.count);
          

        // Build field label map
        this.fieldLabelMap = { submittedAt: 'Submit Timeline' };
        form.sections.forEach((section) => {
          section.fields.forEach((field) => {
            if (field.id) {
              const label =
                (field.fieldConfig as any)['label'] ||
                (field.fieldConfig as any)['placeholder'] ||
                field.fieldType;
              this.fieldLabelMap[field.id] = label;
            }
          });
        });

        // Build table columns + data
        if (!responses || responses.length === 0) {
          const schemaKeys = form.sections
            .flatMap((s) => s.fields)
            .sort((a, b) => a.fieldOrder - b.fieldOrder)
            .map((f) => f.id!)
            .filter(Boolean);
          this.displayedColumns = ['slNo', 'submittedAt', ...schemaKeys];
          this.dataSource.data = [];
        } else {
          this.hasData = true;
          const dynamicKeys = Object.keys(responses[0].response || {});
          this.displayedColumns = ['slNo', 'submittedAt', ...dynamicKeys];
          this.dataSource.data = responses.map((res) => ({
            submittedAt: new Date(res.submittedAt),
            ...res.response,
          }));
          this.setupFilter();
        }

        // Draw charts
        this.initCompletionChart(respondents.count, assignees.count);
        this.initTimelineChart(responses ?? []);
        this.initWeekdayChart(responses ?? []);
      },
      error: () => {
        this.isLoading = false;
        this.displayedColumns = ['slNo', 'submittedAt'];
        this.dataSource.data = [];
      },
    });
  }

  // ── Chart 1: doughnut ────────────────────────────────────────────────────
  private initCompletionChart(responded: number, total: number): void {
    const ctx = this.completionCanvas.nativeElement.getContext('2d')!;

    // If total assigned users is 0 or unknown, fall back to
    // total responses vs unique responders mode
    const useResponseMode = total === 0;

    const totalResponses = this.dataSource.data.length;
    const chartFilled = useResponseMode ? responded : responded;
    const chartTotal = useResponseMode ? totalResponses : total;
    const chartPending = Math.max(0, chartTotal - chartFilled);
    const pct = chartTotal > 0 ? Math.round((chartFilled / chartTotal) * 100) : 0;

    const labels = useResponseMode
      ? ['Unique Responders', 'Repeat Responses']
      : ['Responded', 'Pending'];

    const centerBottom = useResponseMode
      ? `${chartFilled} unique / ${chartTotal} total`
      : `${chartFilled} / ${chartTotal}`;

    this.completionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: [chartFilled, chartPending],
            backgroundColor: [C_PRIMARY, C_PRIMARY_SOFT],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        cutout: '74%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, font: { size: 12 }, color: C_MUTED },
          },
          tooltip: {
            callbacks: { label: (c) => ` ${c.parsed} responses` },
          },
        },
      },
      plugins: [
        {
          id: 'centerText',
          afterDraw: (chart) => {
            const {
              ctx: c,
              chartArea: { width, height, left, top },
            } = chart;
            const cx = left + width / 2;
            const cy = top + height / 2;
            c.save();
            c.font = 'bold 24px sans-serif';
            c.fillStyle = C_PRIMARY;
            c.textAlign = 'center';
            c.textBaseline = 'middle';
            c.fillText(`${pct}%`, cx, cy - 10);
            c.font = '12px sans-serif';
            c.fillStyle = C_MUTED;
            c.fillText(centerBottom, cx, cy + 12);
            c.restore();
          },
        },
      ],
    });
  }

  // ── Chart 2: line — submissions over time ────────────────────────────────
  private initTimelineChart(responses: FormResponseData[]): void {
    const ctx = this.timelineCanvas.nativeElement.getContext('2d')!;
    const { labels, counts } = this.buildTimelineData(responses);

    this.timelineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Responses',
            data: counts,
            borderColor: C_PRIMARY,
            backgroundColor: 'rgba(103,80,164,0.08)',
            borderWidth: 2,
            pointBackgroundColor: C_PRIMARY,
            pointRadius: 4,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: C_MUTED },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, font: { size: 11 }, color: C_MUTED },
            grid: { color: C_GRID },
          },
        },
      },
    });
  }

  // ── Chart 3: bar — responses by day of week ──────────────────────────────
  private initWeekdayChart(responses: FormResponseData[]): void {
    const ctx = this.weekdayCanvas.nativeElement.getContext('2d')!;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = new Array(7).fill(0);

    responses.forEach((res) => {
      const d = new Date(res.submittedAt);
      if (!isNaN(d.getTime())) counts[d.getDay()]++;
    });

    const max = Math.max(...counts);
    const bgColors = counts.map((c) => (c === max && max > 0 ? C_PRIMARY : C_PRIMARY_SOFT));

    this.weekdayChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Responses',
            data: counts,
            backgroundColor: bgColors,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (c) => ` ${c.parsed.y} responses` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: C_MUTED },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, font: { size: 11 }, color: C_MUTED },
            grid: { color: C_GRID },
          },
        },
      },
    });
  }

  // ── Timeline helper ──────────────────────────────────────────────────────
  private buildTimelineData(responses: FormResponseData[]): { labels: string[]; counts: number[] } {
    if (!responses.length) return { labels: [], counts: [] };

    const dates = responses
      .map((r) => new Date(r.submittedAt))
      .filter((d) => !isNaN(d.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());

    if (!dates.length) return { labels: [], counts: [] };

    const diffHours = (dates[dates.length - 1].getTime() - dates[0].getTime()) / 3_600_000;
    const useHour = diffHours <= 24;
    const buckets = new Map<string, number>();

    dates.forEach((d) => {
      const key = useHour
        ? `${d.getHours().toString().padStart(2, '0')}:00`
        : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    });

    return {
      labels: Array.from(buckets.keys()),
      counts: Array.from(buckets.values()),
    };
  }

  // ── Table helpers (unchanged) ────────────────────────────────────────────
  getColumnLabel(column: string): string {
    return this.fieldLabelMap[column] ?? column;
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    const cols = [...this.displayedColumns];
    moveItemInArray(cols, event.previousIndex + 1, event.currentIndex + 1);
    this.displayedColumns = cols;
  }

  getSerialNumber(rowIndex: number): number {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? 10;
    return pageIndex * pageSize + rowIndex + 1;
  }

  formatValue(value: any): string {
    if (value === null || value === undefined || value === '') return '---';
    if (value instanceof Date) return value.toLocaleString();
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  downloadAsExcel(): void {
    const data = this.dataSource.data;

    if (!data || data.length === 0) return;

    // Convert data with labels instead of UUID keys
    const formattedData = data.map((row, index) => {
      const newRow: any = {};

      this.displayedColumns.forEach((col) => {
        const label = this.getColumnLabel(col);

        if (col === 'slNo') {
          newRow[label] = this.getSerialNumber(index);
        } else {
          newRow[label] = this.formatValue(row[col]);
        }
      });

      return newRow;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Responses: worksheet },
      SheetNames: ['Responses'],
    };

    XLSX.writeFile(workbook, `${this.formTitle || 'responses'}.xlsx`);
    this.toastr.success('File downloaded successfully!!');
  }

  downloadAsCsv(): void {
    const data = this.dataSource.data;

    if (!data || data.length === 0) return;

    // Prepare headers using labels instead of UUIDs
    const headers = this.displayedColumns.map((col) => this.getColumnLabel(col));

    const rows = data.map((row, index) => {
      return this.displayedColumns.map((col) => {
        if (col === 'slNo') return this.getSerialNumber(index);
        return this.formatValue(row[col]);
      });
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.formTitle || 'responses'}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
    this.toastr.success('File downloaded successfully!!');
  }
}
