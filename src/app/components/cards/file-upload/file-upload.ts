import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FieldType } from '../../../enums/field-type.enum';
import { FileUploadField } from '../../../interfaces/field-config-schema';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload',
  imports: [MatFormFieldModule, MatIcon],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  @Input() fieldConfig!: FileUploadField;
  @Input() control!: FormControl;

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.control.setValue(file);
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }
  
}
