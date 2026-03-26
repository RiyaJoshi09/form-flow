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
import { BuilderCheckBox } from '../../components/builder-cards/builder-check-box/builder-check-box';
import { BuilderFileUpload } from '../../components/builder-cards/builder-file-upload/builder-file-upload';
import { BuilderRadioButton } from '../../components/builder-cards/builder-radio-button/builder-radio-button';
import { BuilderSelectCard } from '../../components/builder-cards/builder-select-card/builder-select-card';
import { BuilderTextarea } from '../../components/builder-cards/builder-textarea/builder-textarea';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormService } from '../../services/form-service';
import { FormSubmission } from '../form-submission/form-submission';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';

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
    ThemeSelector
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
  
  selectedFieldIndex: number |null=null;
  selectedSectionIndex: number | null=null;

  predefinedColours: string[]= [
    '#000000',
    '#EF4444',
    '#10B981',
    '#3B82F6'
  ]


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) { }

  elements = [
    { type: 'text', label: 'Text Input' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'file-upload', label: 'File Upload' },
    { type: 'radio-button', label: 'Radio Button' },
    { type: 'select-card', label: 'Select Card' },
    { type: 'text-area', label: 'Text Area' }
  ];


  ngOnInit() {
    this.editingFormId = this.route.snapshot.paramMap.get('id');

    if (this.editingFormId) {
      this.loadFromForEditing(this.editingFormId);
    }
  }

  loadFromForEditing(formId: string) {
    const rawData = localStorage.getItem('formflow_forms');
    if (rawData) {
      const allForms = JSON.parse(rawData);

      const formToEdit = allForms.find((f: any) => f.id === formId);

      if (formToEdit) {
        this.formTitle = formToEdit.title;
        this.formSections = formToEdit.sections;
      }
    }
  }

  saveForm() {
    const rawData = localStorage.getItem('formflow_forms');

    let allForms = rawData ? JSON.parse(rawData) : [];

    const hasFields = this.formSections.some(section => section.fields && section.fields.length > 0);

    if (!this.formTitle || this.formTitle.trim() === '') {
      alert('Please provide a title for your form.');
      return;
    }

    if (!hasFields) {
      alert('Cannot save an empty form. Please add at least one field.');
      return; // Stop execution
    }

    if (this.editingFormId) {
      const index = allForms.findIndex((f: any) => f.id === this.editingFormId);
      if (index !== -1) {
        allForms[index] = {
          ...allForms[index],
          title: this.formTitle,
          sections: this.formSections,
          createdAt: new Date()
        };
      }
    } else {
      const formToSave = {
        id: Date.now().toString(),
        title: this.formTitle,
        sections: this.formSections,
        status: 'active',
        responses: 0,
        createdAt: new Date(),
      };
      // this.formService.createForm(formToSave);
      allForms.push(formToSave);
    }

    localStorage.setItem('formflow_forms', JSON.stringify(allForms));

    alert('Form Saved Successfully!');
    this.router.navigate(['/']);
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
    return this.formSections.map(s => s.id);
  }

  onDrop(event: CdkDragDrop<any[]>, sectionIndex: number) {
    if (event.previousContainer === event.container) {
      // Rearrange
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    else if (event.previousContainer.id === 'sidebar') {
      //Sidebar to Canvas
      const field = event.previousContainer.data[event.previousIndex];

      const newField = {
        id: Date.now().toString(),
        type: field.type,
        label: field.label,
        validations: {},
        options: ['checkbox', 'radio-button', 'select-card'].includes(field.type) ? ['Option 1'] : [],
        placeholder: field.placeholder || '',

        color: '#000000',
        fontSize: '12px',
        bold: false,
        italic: false,
        underline: false
      };

      this.formSections[sectionIndex].fields.splice(event.currentIndex, 0, newField);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSectionDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.formSections,
      event.previousIndex,
      event.currentIndex
    );
  }

  /*
  addField(field: any, sectionIndex: number) {
    // To add field to canvas
    const newField = {
      id: this.formSections[sectionIndex].fields.length + 1, //change it
      type: field.type,
      label: field.label,
      validations: {},
      options: field.options || [],
      placeholder: field.placeholder || '',
    };
    this.formSections[sectionIndex].fields.push(newField);
    this.formSections = [...this.formSections];
  }
  */

  removeField(sectionIndex: number, fieldIndex: number) {
    // To remove field from canvas
    this.formSections[sectionIndex].fields.splice(fieldIndex, 1);
    this.formSections = [...this.formSections];
  }

  editField(sectionIndex: number, fieldIndex: number) {
    // open edit dialog box and edit the copy of it until saved
    const fieldToEdit = JSON.parse(JSON.stringify(this.formSections[sectionIndex].fields[fieldIndex]));

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
clearSelection(){
  this.selectedFieldIndex = null;
  this.selectedSectionIndex = null;
}

  openPreview() {
    this.dialog.open(FormSubmission, {
      width: '90vw',
      height: '90vh',
      data: {
        structure: this.formSections,
        title: this.formTitle,
        isReadOnly: true
      }
    })
  }

}
