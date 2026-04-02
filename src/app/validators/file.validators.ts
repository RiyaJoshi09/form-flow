import { AbstractControl, ValidationErrors } from '@angular/forms';

// ✅ File Size Validator
export function fileSizeValidator(maxSizeKB: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;

    return file.size > maxSizeKB * 1024
      ? { maxSize: true }
      : null;
  };
}

// ✅ File Type Validator
export function fileTypeValidator(allowedTypes: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;

    const ext = file.name.split('.').pop()?.toLowerCase();

    return !allowedTypes.includes(ext!)
      ? { fileType: true }
      : null;
  };
}