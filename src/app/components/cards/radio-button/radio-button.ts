import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldType } from '../../../enums/field-type.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { RadioField } from '../../../interfaces/InputField';

@Component({
  selector: 'app-radio-button',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.css',
})
export class RadioButton {
  @Input() fieldConfig!: RadioField;
  @Input() control!: FormControl;
  
  // control = new FormControl('', {
  //   nonNullable: true,
  //   validators: [Validators.required],
  // });

  // fieldConfig: RadioField = {
  //   id: 'gender',
  //   type: FieldType.RADIO,
  //   label: 'Gender',
  //   order: 1,
  //   config: {
  //     options: ['Male', 'Female', 'Other'],
  //   },
  // };
}
