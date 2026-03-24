import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxField } from '../../../interfaces/InputField';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';

@Component({
  selector: 'app-builder-check-box',
  imports: [MatFormFieldModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './builder-check-box.html',
  styleUrl: './builder-check-box.css',
})
export class BuilderCheckBox {
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
