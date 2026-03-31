import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShareDialog } from '../share-dialog/share-dialog';

import { FormService } from '../../services/form-service';

import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-my-forms',
  imports: [RouterLink, MatIcon, DatePipe, MatDialogModule, MatMenu, MatMenuTrigger],
  templateUrl: './my-forms.html',
  styleUrl: './my-forms.css',
})
export class MyForms {
  @Input() viewMode: 'all' | 'trash' = 'all';

  forms: any[] = [];
  totalFormsarray: any[] = [];
  totalForms = 0;
  totalActive = 0;
  totalRes = 0;

  constructor(
    private dialog: MatDialog,
    private formService: FormService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getFormData();
  }

  get isTrashView(): boolean {
    return this.viewMode === 'trash';
  }

  get sectionTitle(): string {
    return this.isTrashView ? 'Trash' : 'My Forms';
  }

  get sectionDescription(): string {
    return this.isTrashView
      ? 'Forms moved to trash can be restored from here.'
      : 'Manage and track your data collection';
  }

  getFormData() {
    const forms$ = this.isTrashView
      ? this.formService.getTrashedForms()
      : this.formService.getAllForms();

    forms$.subscribe((data: any[]) => {
      this.forms = data;
      this.totalFormsarray = data;
      this.loadSummary();
      this.cd.detectChanges();

      if (this.isTrashView) {
        return;
      }

      this.forms.forEach((form: any) => {
        this.formService.getFormResponseById(form.id).subscribe((res: any) => {
          form.responses = res.length;
          this.loadSummary();
          this.cd.detectChanges();
        });
      });
    });
  }

  loadSummary() {
    this.totalForms = this.forms.length;
    this.totalActive = this.forms.filter((f: any) => f.published == true).length;
    this.totalRes = this.forms.reduce((sum: number, f: any) => sum + (f.responses || 0), 0);
  }

  moveToTrash(id: number | undefined) {
    if (!id) {
      return;
    }

    this.formService.moveFormToTrash(id).subscribe(() => {
      this.forms = this.forms.filter((form) => form.id !== id);
      this.totalFormsarray = this.totalFormsarray.filter((form) => form.id !== id);
      this.loadSummary();
      this.cd.detectChanges();
    });
  }

  restoreForm(id: number | undefined) {
    if (!id) {
      return;
    }

    this.formService.restoreFormFromTrash(id).subscribe(() => {
      this.forms = this.forms.filter((form) => form.id !== id);
      this.totalFormsarray = this.totalFormsarray.filter((form) => form.id !== id);
      this.loadSummary();
      this.cd.detectChanges();
    });
  }

  shareForm(id: number) {
    const link = `${window.location.origin}/form/${id}`;

    this.dialog.open(ShareDialog, {
      width: '500px',
      height: '150px',
      data: { link: link },
    });
  }

  filterStatus(status: String) {
    if (this.isTrashView) {
      return;
    }

    if (status == 'all') {
      this.getFormData();
    } else if (status == 'published') {
      this.forms = this.totalFormsarray.filter((f: any) => f.published == true);
      this.loadSummary();
    } else if (status == 'draft') {
      this.forms = this.totalFormsarray.filter((f: any) => f.published == false);
      this.loadSummary();
    }
  }
}
