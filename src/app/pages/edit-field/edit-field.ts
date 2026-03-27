import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-edit-field',
  imports: [CommonModule, FormsModule, MatDialogContent, MatDialogActions, MatTabsModule],
  templateUrl: './edit-field.html',
  styleUrl: './edit-field.css',
})

export class EditField {

  field : any;

  validationOptions : any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditField> ) {
    this.field = data;
    this.setValidationOptions();
  }

  setValidationOptions() {

    if (this.field.type === 'TEXT') {
      this.validationOptions = [
        {key: 'required', label: 'Required', value: false},
        {key: 'minLength', label: 'Min Length', value: null},
        {key: 'maxLength', label: 'Max Length', value: null},
        {key: 'email', label: 'Email', value: false}
      ];
    }

    if (this.field.type === 'NUMBER') {
      this.validationOptions = [
        {key: 'required', label: 'Required', value: false},
        {key: 'min', label: 'Min Value', value: null},
        {key: 'max', label: 'Max Value', value: null}
      ];
    }

    if (this.field.type === 'CHECKBOX') {
      this.validationOptions = [
        {key: 'required', label: 'Required (must be checked)', value: false}
      ];
    }

    if (this.field.type === 'RADIO') {
      this.validationOptions = [
        {key: 'required', label: 'Required (must select one option)', value: false}
      ];
    }

    if (this.field.type === 'DROPDOWN') {
      this.validationOptions = [
        {key: 'required', label: 'Required', value: false}
      ];
    }

    if (this.field.type === 'FILE') {
      this.validationOptions = [
        {key: 'required', label: 'Required', value: false},
        {key: 'maxSize', label: 'Max File Size (KB)', value: null},
        {key: 'fileType', label: 'Allowed File Types (e.g. pdf, jpg)', value: ''}
      ];
    }

    if (this.field.type === 'TEXTAREA') {
      this.validationOptions = [
        {key: 'required', label: 'Required', value: false},
        {key: 'minLength', label: 'Min Length', value: null},
        {key: 'maxLength', label: 'Max Length', value: null}
      ];
    }

    if (this.field.validations) {
      this.validationOptions.forEach(opt => {
        if (this.field.validations[opt.key] !== undefined) {
          opt.value = this.field.validations[opt.key];
        }
      });
    }
  }

  save() {
    const validations : any = {};

    this.validationOptions.forEach(opt => {
      if (opt.value !== null && opt.value !== false && opt.value !== '') {
        validations[opt.key] = opt.value === true ? true : opt.value;
      }
    });

    this.field.validations = validations;

    this.dialogRef.close({...this.field});
  }

  cancel() {
    this.dialogRef.close();
  }

}
