import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';

@Component({
  selector: 'app-builder-radio-button',
  imports: [MatFormFieldModule, ReactiveFormsModule,MatRadioModule],
  templateUrl: './builder-radio-button.html',
  styleUrl: './builder-radio-button.css',
})
export class BuilderRadioButton {
  @Input() bluePrint!:BuilderFieldSchema; 
}
