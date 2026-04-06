import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputText } from '../../components/cards/input-text/input-text';
import { FileUpload } from '../../components/cards/file-upload/file-upload';
import { CheckBox } from '../../components/cards/check-box/check-box';
import { RadioButton } from '../../components/cards/radio-button/radio-button';
import { SelectCard } from '../../components/cards/select-card/select-card';
import { Textarea } from '../../components/cards/textarea/textarea';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../services/form-service';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../interfaces/form-schema';
import { fileSizeValidator, fileTypeValidator } from '../../validators/file.validators';
import { ToastrService } from 'ngx-toastr';
import { FormSettingsSchema } from '../../interfaces/form-settings-schema';

@Component({
  selector: 'app-form-submission',
  imports: [
    CommonModule,
    InputText,
    FileUpload,
    CheckBox,
    RadioButton,
    SelectCard,
    Textarea,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './form-submission.html',
  styleUrl: './form-submission.css',
})
export class FormSubmission {
  formGroup: FormGroup = new FormGroup({});
  formStructure: any;
  isReadOnly: boolean = false;
  isSubmitting: boolean = false;
  isSubmitted: boolean = false;
  closeMessage: string = '';
  isClosed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private cd: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    //Check if data was passed through the Dialog (Preview Mode)
    if (this.dialogData) {
      this.formStructure = this.dialogData;
      this.isReadOnly = this.dialogData.isReadOnly;
      this.buildReactiveForm();
    }
    //Check URL (Live Mode)
    else {
      const formId = this.route.snapshot.paramMap.get('id');
      if (formId) {
        // Convert formId to number to match your service signature
        this.formService.getResponseFormById(formId).subscribe({
          next: (form: Form) => {
            this.formStructure = form;
            this.isReadOnly = false;
            if(this.checkAvailability(form)){
              this.buildReactiveForm();
              this.loadDraft(formId);
              this.setupDraftTimer(formId);
            } else {
              this.isClosed = true;
              this.closeMessage = form.settings?.closeMessage || "This form is closed";
            }
          },
          error: (err) => {
            console.error('Could not fetch form:', err);
            this.toastr.error('Error: Form not found on server.');
          },
        });
      }
    }
  }

  checkAvailability(form: any): boolean{
    if (!form.settings?.deadline) return true; 
    const now = new Date();
    const deadline = new Date(form.settings.deadline);
    if (isNaN(deadline.getTime())) return true; 

    return now < deadline;
  }

  getFieldStyle(config: any) {
    return {
      color: config?.color || '#000000',
      'font-size': config?.fontSize || '12px',
      'font-weight': config?.bold ? 'bold' : 'normal',
      'font-style': config?.italic ? 'italic' : 'normal',
      'text-decoration': config?.underline ? 'underline' : 'none',
    };
  }

  getControl(field: any): FormControl {
    const controlId = String(field.id || field.fieldOrder);
    const control = this.formGroup.get(controlId);
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
        const controlKey = String(field.id || field.fieldOrder);
        const config = field.fieldConfig || {};
        const validators = [];
        if (config.validations?.required) validators.push(Validators.required);
        if (config.validations?.email) validators.push(Validators.email);
        if (config.validations?.minLength)
          validators.push(Validators.minLength(config.validations.minLength));
        if (config.validations?.maxLength)
          validators.push(Validators.maxLength(config.validations.maxLength));
        if (config.validations?.min) validators.push(Validators.min(config.validations.min));
        if (config.validations?.max) validators.push(Validators.max(config.validations.max));
        if (field.fieldType === 'FILE') {
          if (config.validations?.maxSize) {
            validators.push(fileSizeValidator(config.validations.maxSize));
          }
          if (config.validations?.fileType) {
            const types = config.validations.fileType
              .split(',')
              .map((t: string) => t.trim().toLowerCase());
            validators.push(fileTypeValidator(types));
          }
        }
        const initialValue = field.fieldType === 'FILE' ? null : '';
        controls[controlKey] = new FormControl(initialValue, validators);
      });
    });

    this.formGroup = new FormGroup(controls);
    this.cd.detectChanges();
  }

  setupDraftTimer(formId: string) {
    this.formGroup.valueChanges.subscribe(values => {
      localStorage.setItem(`form_draft_${formId}`, JSON.stringify(values));
    })
  }

  loadDraft(formId: string) {
    const savedDraft = localStorage.getItem(`form_draft_${formId}`);
    if (savedDraft){
      const draftValues = JSON.parse(savedDraft);
      this.formGroup.patchValue(draftValues);
    }
  }
  
  // submitResponse() {
  //   if (this.isReadOnly) {
  //     this.toastr.warning("This is a preview. Data is not saved to the database.");
  //     return;
  //   }

  //   if (this.formGroup.valid) {
  //     this.isSubmitting = true;

  //     const responseEntry = {
  //       formId: this.formStructure.id,
  //       response: this.formGroup.value,
  //     };

  //     console.log(this.formGroup.value);

  //     this.formService.submitResponse(responseEntry).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.toastr.success("Response saved successfully!");
  //         this.formGroup.reset();
  //         this.isSubmitting = false;
  //       },
  //       error: (err) => {
  //         console.error("Submission failed", err);
  //         this.toastr.error("Could not save response. Please try again.");
  //         this.isSubmitting = false;
  //       },
  //     });
  //   } else {
  //     this.formGroup.markAllAsTouched(); // Show errors to the user
  //     this.toastr.error("Please fix the errors before submitting.");
  //   }
  // }

  submitResponse() {
    if (this.isReadOnly) {
      this.toastr.warning('This is a preview. Data is not saved to the database.');
      return;
    }

    if (this.formGroup.valid) {
      this.isSubmitting = true;
      const rawValue = this.formGroup.value;
      const formData = new FormData();
      const files: File[] = [];

      Object.keys(rawValue).forEach((key) => {
        const value = rawValue[key];
        if (value instanceof File) {
          files.push(value);
        }
      });
      formData.append(
        'response',
        JSON.stringify({
          formId: this.formStructure.id,
          response: rawValue,
        }),
      );

      // 👇 Append files
      files.forEach((file) => {
        formData.append('files', file);
      });

      this.formService.submitResponse(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Response saved successfully!');
          this.formGroup.reset();
          this.isSubmitting = false;
          this.isSubmitted = true;
          localStorage.removeItem(`form_draft_${this.formStructure.id}`);
        },
        error: (err) => {
          console.error('Submission failed', err);
          this.toastr.error('Could not save response. Please try again.');
          this.isSubmitting = false;
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      this.toastr.error('Please fix the errors before submitting.');
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.isSubmitting = false;
    this.formGroup.reset();
  }
}
