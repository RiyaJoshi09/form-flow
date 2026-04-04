import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextField } from '../../../interfaces/field-config-schema';
import { FieldType } from '../../../enums/field-type.enum';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-text',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
})
export class InputText {
  @Input() fieldConfig!: TextField;
  @Input() control!: FormControl;
  /*
  control = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3), Validators.email],
  });
  fieldConfig: TextField = {
    id: 'email',
    type: FieldType.TEXT,
    label: 'Email',
    order: 1,
  };
  */
}
