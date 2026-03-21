import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldType } from '../../../enums/field-type.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextareaField } from '../../../interfaces/InputField';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
})
export class Textarea {
  // @Input() fieldConfig!: TextField;
  // @Input() control!: FormControl;
  
  control = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  fieldConfig: TextareaField = {
    id: 'bio',
    type: FieldType.TEXTAREA,
    label: 'Your Bio',
    order: 1,
  };
}
