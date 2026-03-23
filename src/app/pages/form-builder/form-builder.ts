import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditField } from '../edit-field/edit-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { InputText } from '../../components/cards/input-text/input-text';
import { FileUpload } from '../../components/cards/file-upload/file-upload';
import { CheckBox } from '../../components/cards/check-box/check-box';
import { SelectCard } from '../../components/cards/select-card/select-card';
import { Textarea } from '../../components/cards/textarea/textarea';
import { RadioButton } from '../../components/cards/radio-button/radio-button';

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
    InputText,
    FileUpload,
    CheckBox,
    SelectCard,
    Textarea,
    RadioButton
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
      createdAt: new Date(),
    };

    localStorage.setItem('formflow_forms', JSON.stringify(formToSave));

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
  }

  removeField(sectionIndex: number, fieldIndex: number) {
    // To remove field from canvas
    this.formSections[sectionIndex].fields.splice(fieldIndex, 1);
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
      }
    });
  }
}
