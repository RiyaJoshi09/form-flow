import { FieldType } from "../enums/field-type.enum";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  maxSize?: number;
}

export interface BuilderFieldSchema {
    type?: FieldType,
    placeholder?: string,
    options?: string[],
    validations?:ValidationRules
}