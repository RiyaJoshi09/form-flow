import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';

@Component({
  selector: 'app-builder-textarea',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './builder-textarea.html',
  styleUrl: './builder-textarea.css',
})
export class BuilderTextarea {
  @Input() bluePrint!:BuilderFieldSchema;
}
