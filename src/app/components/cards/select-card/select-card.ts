import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldType } from '../../../enums/field-type.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectField } from '../../../interfaces/InputField';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-card',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './select-card.html',
  styleUrl: './select-card.css',
})
export class SelectCard {
  
  @Input() fieldConfig!: SelectField;
  @Input() control!: FormControl;

  // control = new FormControl('', {
  //   nonNullable: true,
  //   validators: [Validators.required],
  // });
  // fieldConfig: SelectField = {
  //   id: 'role',
  //   type: FieldType.SELECT,
  //   label: 'Select Role',
  //   order: 1,
  //   config: {
  //     options: ['Admin', 'User', 'Guest'],
  //   },
  // };
}
