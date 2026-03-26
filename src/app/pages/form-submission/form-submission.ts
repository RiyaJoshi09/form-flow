import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputText } from '../../components/cards/input-text/input-text';
import { FileUpload } from '../../components/cards/file-upload/file-upload';
import { CheckBox } from '../../components/cards/check-box/check-box';
import { RadioButton } from '../../components/cards/radio-button/radio-button';
import { SelectCard } from '../../components/cards/select-card/select-card';
import { Textarea } from '../../components/cards/textarea/textarea';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../services/form-service';
import { Form } from '../../interfaces/form-schema';

@Component({
  selector: 'app-form-submission',
  imports: [CommonModule,
    InputText,
    FileUpload,
    CheckBox,
    RadioButton,
    SelectCard,
    Textarea,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule],
  templateUrl: './form-submission.html',
  styleUrl: './form-submission.css',
})
export class FormSubmission {

  formGroup: FormGroup = new FormGroup({});
  formStructure: any;
  isReadOnly: boolean = false;

  constructor(private route: ActivatedRoute,
    private formService: FormService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    //Check if data was passed through the Dialog (Preview Mode)
    if (this.dialogData) {
      this.formStructure = {
        title: this.dialogData.title,
        sections: this.dialogData.structure
      };
      this.isReadOnly = this.dialogData.isReadOnly;
      this.buildReactiveForm();
    }
    //Check URL (Live Mode)
    else {
      const formId = this.route.snapshot.paramMap.get('id');
      if (formId) {
      // Convert formId to number to match your service signature
      this.formService.getFormById(Number(formId)).subscribe({
        next: (form: Form)  => {
          this.formStructure = form; // This will now have backend naming (sectionTitle, etc.)
          this.isReadOnly = false;
          this.buildReactiveForm();
        },
        error: (err) => {
          console.error("Could not fetch form:", err);
          alert("Error: Form not found on server.");
        }
      });
    }
    }
  }

  getControl(id: string): FormControl {
    const control = this.formGroup.get(id);
    if (!control) {
      throw new Error('Control with id ${id} not found in FormGroup');
    }
    return control as FormControl;
  }

  buildReactiveForm() {
    const controls: any = {};
    if (!this.formStructure || !this.formStructure.sections) return;

    this.formStructure.sections.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        const config = field.fieldConfig || {};
        const validators = [];
        if (config.validations?.required) validators.push(Validators.required);
        if (config.validations?.email) validators.push(Validators.email);
        if (config.validations?.minLength) validators.push(Validators.minLength(config.validations.minLength));
        if (config.validations?.maxLength) validators.push(Validators.maxLength(config.validations.maxLength));
        if (config.validations?.fileType) validators.push(Validators.pattern(config.validations.fileType));
        if (config.validations?.min) validators.push(Validators.min(config.validations.min));
        if (config.validations?.max) validators.push(Validators.max(config.validations.max));
        if (config.validations?.maxSize) validators.push(Validators.max(config.validations.maxSize));

        controls[field.id || field.fieldOrder] = new FormControl('', validators);
      });
    });

    this.formGroup = new FormGroup(controls);
  }

  submitResponse() {
    if (this.isReadOnly) {
      alert("This is a preview. Data is not saved to the database.");
      console.log("Mock Submission:", this.formGroup.value);
      return;
    }

    if (this.formGroup.valid) {
      const responseEntry = {
        responseId: Date.now().toString(),
        formId: this.formStructure.id,
        answers: this.formGroup.value,
        submittedAt: new Date()
      };

      const existing = JSON.parse(localStorage.getItem('formflow_responses') || '[]');
      existing.push(responseEntry);
      localStorage.setItem('formflow_responses', JSON.stringify(existing));

      alert("Response Submitted!");
    } else {
      this.formGroup.markAllAsTouched(); // Show errors to the user
      alert("Please fix the errors before submitting.");
    }
  }
}
