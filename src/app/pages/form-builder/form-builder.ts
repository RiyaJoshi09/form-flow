import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditField } from '../edit-field/edit-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BuilderInputText } from '../../components/builder-cards/builder-input-text/builder-input-text';
import { BuilderCheckBox } from '../../components/builder-cards/builder-check-box/builder-check-box';
import { BuilderFileUpload } from '../../components/builder-cards/builder-file-upload/builder-file-upload';
import { BuilderRadioButton } from '../../components/builder-cards/builder-radio-button/builder-radio-button';
import { BuilderSelectCard } from '../../components/builder-cards/builder-select-card/builder-select-card';
import { BuilderTextarea } from '../../components/builder-cards/builder-textarea/builder-textarea';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

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
    DragDropModule
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
  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  elements = [
    { type: 'text', label: 'Text Input'},
    { type: 'checkbox', label: 'Checkbox'},
    {type: 'file-upload', label: 'File Upload'},
    {type: 'radio-button', label: 'Radio Button'},
    {type: 'select-card', label: 'Select Card'},
    {type: 'text-area', label: 'Text Area'}
  ];


  ngOnInit() {}

  saveForm() {
    const formToSave = {
      id: Date.now().toString(),
      title: this.formTitle,
      sections: this.formSections,
      status: 'active',
      responses: 0,
      createdAt: new Date(),
    };
    const rawData = localStorage.getItem('formflow_forms');
    let existingForms: any[] = [];

    try {
      // Only parse if rawData isn't null or empty
      existingForms = rawData ? JSON.parse(rawData) : [];
      
      // Safety check: ensure existingForms is actually an array
      if (!Array.isArray(existingForms)) {
        existingForms = [];
      }
    } catch (e) {
      console.error("Error parsing local storage", e);
      existingForms = [];
    }

    existingForms.push(formToSave);

    localStorage.setItem('formflow_forms', JSON.stringify(existingForms));

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

  get sectionsIds(): string[]{
    return this.formSections.map(s=>s.id);
  }

  onDrop(event:CdkDragDrop<any[]>, sectionIndex: number){
    if (event.previousContainer === event.container){
      // Rearrange
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //Sidebar to Canvas
      const field = event.previousContainer.data[event.previousIndex];

      const newField = {
        id: this.formSections[sectionIndex].fields.length + 1, //change it
        type: field.type,
        label: field.label,
        validations: {},
        options: field.options || [],
        placeholder: field.placeholder || '',
      };

      this.formSections[sectionIndex].fields.splice(event.currentIndex, 0, newField);
    }
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
      }
    });
  }
}
