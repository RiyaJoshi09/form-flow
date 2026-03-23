import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditField } from '../edit-field/edit-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-form-builder',
  imports:  [ RouterLink,
    RouterOutlet,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.css',
})
export class FormBuilder {
  formTitle: string = 'Untitled Form';
  formSections: any[] = [
    {
      id: Date.now().toString(),
      title: 'Add Section Title',
      fields: []
    }
  ];
  constructor(private dialog: MatDialog, private router: Router) { }

  elements = [
    { type: 'text', label: 'Text Input', placeholder: 'Enter hint...' },
    { type: 'number', label: 'Number Input', placeholder: '0' },
    { type: 'checkbox', label: 'Checkbox', placeholder: '' }
  ];

  ngOnInit() { }

  addSection(){
    this.formSections.push({
      id: Date.now().toString(),
      title: `Add Section Title`,
      fields: []
    });
  }

  removeSection(index: number) {
    if (this.formSections.length > 1) {
      this.formSections.splice(index, 1);
    } else {
      alert("A form must have at least one section.");
    }
  }

  addField(field: any, sectionIndex: number) {
    // To add field to canvas
    const newField = {
      id: Date.now().toString(), //change it
      type: field.type,
      label: field.label,
      placeholder: field.placeholder, //validations yet to add
      validations: {}
    };
    this.formSections[sectionIndex].fields.push(newField);
  }
  saveForm() {
    const formToSave = {
      id: Date.now().toString(),
      title: this.formTitle,
      sections: this.formSections,
      createdAt: new Date()
    };

    localStorage.setItem('formflow_forms', JSON.stringify(formToSave));

    alert('Form Saved Successfully!');
    this.router.navigate(['/']);

  }

  removeField(sectionIndex: number, fieldIndex: number) {
    // To remove field from canvas
    this.formSections[sectionIndex].fields.splice(fieldIndex, 1);
  }

  editField(sectionIndex: number, fieldIndex: number): void {
    // open edit dialog box and edit the copy of it until saved
    const targetField = this.formSections[sectionIndex].fields[fieldIndex];

    const fieldCopy = JSON.parse(JSON.stringify(targetField));

    const dialogRef = this.dialog.open(EditField, {
      width: '400px',
      data: fieldCopy
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //Update field with new data once saved
        this.formSections[sectionIndex].fields[fieldIndex] = result;
      }
    })
  }
}
