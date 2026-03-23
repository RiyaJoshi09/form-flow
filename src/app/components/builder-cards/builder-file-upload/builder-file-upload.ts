import { Component, Input } from '@angular/core';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-builder-file-upload',
  imports: [MatFormFieldModule],
  templateUrl: './builder-file-upload.html',
  styleUrl: './builder-file-upload.css',
})
export class BuilderFileUpload {
  @Input() bluePrint!:BuilderFieldSchema;
}
