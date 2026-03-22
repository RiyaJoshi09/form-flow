import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FieldType } from '../../../enums/field-type.enum';
import { FileUploadField } from '../../../interfaces/InputField';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-file-upload',
  imports: [MatFormFieldModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  // @Input() fieldConfig!: TextField;
  // @Input() control!: FormControl;

  control = new FormControl<File | null>(null, {
    nonNullable: true,
    validators: [Validators.required],
  });

  fieldConfig: FileUploadField = {
    id: 'resume',
    type: FieldType.FILE_UPLOAD,
    label: 'Upload Resume',
    order: 1,
  };

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.control.setValue(file);
  }
}
