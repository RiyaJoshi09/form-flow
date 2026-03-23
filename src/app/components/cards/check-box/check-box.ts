import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxField } from '../../../interfaces/InputField';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldType } from '../../../enums/field-type.enum';

@Component({
  selector: 'app-check-box',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.css',
})
export class CheckBox {
  // @Input() fieldConfig!: CheckboxField;
  // @Input() control!: FormControl;

  control = new FormControl<string[]>([], {
    nonNullable: true,
    validators: [Validators.required],
  });

  fieldConfig: CheckboxField = {
    id: 'skills',
    type: FieldType.CHECKBOX,
    label: 'Skills',
    order: 1,
    config: {
      options: ['Java', 'Angular', 'React'],
    },
  };

  onChange(option: string, checked: boolean) {
    const current = this.control.value;

    if (checked) {
      this.control.setValue([...current, option]);
    } else {
      this.control.setValue(current.filter((v:string) => v !== option));
    }
  }
}
