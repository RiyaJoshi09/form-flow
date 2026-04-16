import { FieldType } from "../enums/field-type.enum";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  email?:boolean;
  number?:boolean;
  max?: number;
  maxSize?: number;
  fileType?:string;
  
}

export interface BuilderFieldSchema {
    type?: FieldType,
        correctAnswer?: string;
    placeholder?: string,
    options?: {
      label: string;
      isCorrect: boolean;

    }[]; 
  validations?:ValidationRules
}