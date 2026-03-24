import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';

@Component({
  selector: 'app-builder-input-text',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './builder-input-text.html',
  styleUrl: './builder-input-text.css',
})
export class BuilderInputText {
  @Input() bluePrint!:BuilderFieldSchema;
}
