import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxField } from '../../../interfaces/field-config-schema';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BuilderFieldSchema } from '../../../interfaces/builder-field-schema';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-builder-check-box',
  imports: [MatFormFieldModule, MatCheckboxModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './builder-check-box.html',
  styleUrl: './builder-check-box.css',
})
export class BuilderCheckBox {
  @Input() isQuiz: boolean = false;
  setCorrect(index: number) {
  this.bluePrint.options?.forEach((opt: any, i: number) => {
    opt.isCorrect = i === index;
  });
}
  @Input() bluePrint!:BuilderFieldSchema;
  fieldData: BuilderFieldSchema = this.bluePrint;

  ngOnInit() {
    if (!this.fieldData.options) {
      this.fieldData.options = [{ label: 'Option 1', isCorrect: false }];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bluePrint']) {
      const current = changes['bluePrint'].currentValue;
      this.updateUI(current);
    }
  }
  updateUI(data: BuilderFieldSchema) {
    this.fieldData = data;
  }

  addOption() {
  this.bluePrint.options?.push({
    label: `Option ${this.bluePrint.options.length + 1}`,
    isCorrect: false
  });
}

  removeOption(index : number) {
    this.bluePrint.options?.splice(index, 1);
  }
}
