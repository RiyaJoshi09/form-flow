import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditField } from '../edit-field/edit-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BuilderInputText } from '../../components/builder-cards/builder-input-text/builder-input-text';
import { BuilderFileUpload } from '../../components/builder-cards/builder-file-upload/builder-file-upload';
import { BuilderRadioButton } from '../../components/builder-cards/builder-radio-button/builder-radio-button';
import { BuilderSelectCard } from '../../components/builder-cards/builder-select-card/builder-select-card';
import { BuilderTextarea } from '../../components/builder-cards/builder-textarea/builder-textarea';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormService } from '../../services/form-service';
import { FormSubmission } from '../form-submission/form-submission';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';
import { ThemeService } from '../../services/theme-service';
import { BuilderCheckBox } from '../../components/builder-cards/builder-check-box/builder-check-box';

@Component({
  selector: 'app-form-builder',
  imports: [
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    BuilderInputText,
    BuilderCheckBox,
    BuilderFileUpload,
    BuilderRadioButton,
    BuilderSelectCard,
    BuilderTextarea,
    DragDropModule,
    MatMenuModule,
    ThemeSelector,
  ],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.css',
})
export class FormBuilder {
  formTitle: string = 'Untitled Form';
  formSections: any[] = [
    {
      id: Date.now().toString(),
      title: 'Add Section Title',
      fields: [],
    },
  ];
  editingFormId: string | null = null;

  selectedFieldIndex: number | null = null;
  selectedSectionIndex: number | null = null;

  predefinedColours: string[] = ['#000000', '#EF4444', '#10B981', '#3B82F6'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private themeService: ThemeService,
    private cd: ChangeDetectorRef,
  ) {}

  elements = [
    { type: 'TEXT', label: 'Text Input' },
    { type: 'CHECKBOX', label: 'Checkbox' },
    { type: 'FILE', label: 'File Upload' },
    { type: 'RADIO', label: 'Radio Button' },
    { type: 'DROPDOWN', label: 'Select Card' },
    { type: 'TEXTAREA', label: 'Text Area' },
  ];

  ngOnInit() {
    this.editingFormId = this.route.snapshot.paramMap.get('id');

    if (this.editingFormId) {
      this.loadFromForEditing(this.editingFormId);
    }
  }

  loadFromForEditing(formId: string) {
    this.formService.getFormById(+formId).subscribe({
      next: (form) => {
        localStorage.setItem('prevTheme', localStorage.getItem('theme') || 'theme-pink');
        localStorage.setItem('theme', form.theme);
        this.themeService.loadTheme();
        this.formTitle = form.title;
        this.formSections = form.sections.map((section: any) => ({
          id: section.id,
          title: section.sectionTitle,
          fields: section.fields
            .sort((a: any, b: any) => a.fieldOrder - b.fieldOrder)
            .map((field: any, index: number) => ({
              id: field.id,
              type: field.fieldType,
              label: field.fieldConfig.label,
              validations: field.fieldConfig.validations || {},
              options: field.fieldConfig.options || [],
              placeholder: field.fieldConfig.placeholder || '',
              color: '#000000',
              fontSize: '12px',
              bold: false,
              italic: false,
              underline: false,
            })),
        }));
        this.formSections = [...this.formSections];
        console.log(this.formSections);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Could not load form for editing.');
      },
    });
  }

  saveForm() {
    const hasFields = this.formSections.some(
      (section) => section.fields && section.fields.length > 0,
    );

    if (!this.formTitle?.trim()) {
      alert('Please provide a title for your form.');
      return;
    }

    if (!hasFields) {
      alert('Cannot save an empty form.');
      return;
    }

    const formToSave = {
      id: this.editingFormId,
      title: this.formTitle,
      sections: this.formSections,
      status: 'active',
    };

    console.log(formToSave);

    if (this.editingFormId) {
      this.formService.updateForm(formToSave).subscribe({
        next: (response) => {
          alert('Form updated Successfully to Database!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Error saving form to backend. Check if Spring Boot is running.');
        },
      });
    } else {
      this.formService.createForm(formToSave).subscribe({
      next: (response) => {
        alert('Form Saved Successfully to Database!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error saving form.');
      },
    });
    }
    localStorage.setItem('theme', localStorage.getItem('prevTheme') || 'theme-blue');
    localStorage.removeItem('prevTheme');
    this.themeService.loadTheme();
  }

  addSection() {
    this.formSections.push({
      id: Date.now().toString(),
      title: `Add Section Title`,
      fields: [],
    });
  }

  removeSection(index: number) {
    if (this.formSections.length > 1) {
      this.formSections.splice(index, 1);
    } else {
      alert('A form must have at least one section.');
    }
  }

  duplicateSection(sectionIndex: number) {
    const originalSection = this.formSections[sectionIndex];

    const clonedSection = JSON.parse(JSON.stringify(originalSection));

    clonedSection.id = Date.now().toString();
    clonedSection.title = 'Copy of ' + clonedSection.title;
    clonedSection.fields.forEach((field: any, index: number) => {
      field.id = Date.now().toString() + index;
    });

    this.formSections.splice(sectionIndex + 1, sectionIndex, clonedSection);
  }

  get sectionsIds(): string[] {
    return this.formSections.map((s) => s.id);
  }

  onDrop(event: CdkDragDrop<any[]>, sectionIndex: number) {
    if (event.previousContainer === event.container) {
      // Rearrange
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'sidebar') {
      //Sidebar to Canvas
      const field = event.previousContainer.data[event.previousIndex];

      const newField = {
        id: Date.now().toString(),
        type: field.type,
        label: field.label,
        validations: {},
        options: ['CHECKBOX', 'RADIO', 'DROPDOWN'].includes(field.type) ? ['Option 1'] : [],
        placeholder: field.placeholder || '',

        color: '#000000',
        fontSize: '12px',
        bold: false,
        italic: false,
        underline: false,
      };

      this.formSections[sectionIndex].fields.splice(event.currentIndex, 0, newField);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onSectionDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.formSections, event.previousIndex, event.currentIndex);
  }

  removeField(sectionIndex: number, fieldIndex: number) {
    // To remove field from canvas
    this.formSections[sectionIndex].fields.splice(fieldIndex, 1);
    this.formSections = [...this.formSections];
  }

  editField(sectionIndex: number, fieldIndex: number) {
    // open edit dialog box and edit the copy of it until saved
    const fieldToEdit = JSON.parse(
      JSON.stringify(this.formSections[sectionIndex].fields[fieldIndex]),
    );

    const dialogRef = this.dialog.open(EditField, {
      width: '400px',
      data: fieldToEdit,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //Update field with new data once saved
        this.formSections[sectionIndex].fields[fieldIndex] = result;
        this.formSections = [...this.formSections];

        this.cd.detectChanges();
      }
    });
  }

  duplicateField(sectionIndex: number, fieldIndex: number) {
    const originalField = this.formSections[sectionIndex].fields[fieldIndex];

    const clonedField = JSON.parse(JSON.stringify(originalField));

    clonedField.id = Date.now().toString();

    this.formSections[sectionIndex].fields.splice(fieldIndex + 1, fieldIndex, clonedField);
  }

  selectField(sectionIndex: number, fieldIndex: number) {
    this.selectedSectionIndex = sectionIndex;
    this.selectedFieldIndex = fieldIndex;
  }

  @HostListener('document:click')
  clearSelection() {
    this.selectedFieldIndex = null;
    this.selectedSectionIndex = null;
  }

  openPreview() {
    const previewData = {
      title: this.formTitle,
      sections: this.formSections.map((section, sIndex) => ({
        sectionTitle: section.title,
        sectionOrder: sIndex + 1,
        fields: section.fields.map((field: any, fIndex: number) => ({
          fieldType: field.type,
          fieldOrder: fIndex + 1,
          id: field.id || `temp_${fIndex}`,
          fieldConfig: {
            label: field.label,
            placeholder: field.placeholder,
            options: field.options,
            validations: field.validations,
          },
        })),
      })),
      isReadOnly: true,
    };
    this.dialog.open(FormSubmission, {
      width: '90vw',
      height: '90vh',
      data: previewData,
    });
  }
}
