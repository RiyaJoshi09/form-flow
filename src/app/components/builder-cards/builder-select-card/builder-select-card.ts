import { Component, Input, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-builder-select-card',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './builder-select-card.html',
  styleUrl: './builder-select-card.css',
})
export class BuilderSelectCard {
  @Input() bluePrint!:BuilderFieldSchema;
  fieldData: BuilderFieldSchema = this.bluePrint;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bluePrint']) {
      const current = changes['bluePrint'].currentValue;
      this.updateUI(current);
    }
  }
  updateUI(data: BuilderFieldSchema) {
    this.fieldData = data;
  }
}
