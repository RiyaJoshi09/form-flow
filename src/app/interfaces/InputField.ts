import { FieldType } from "../enums/field-type.enum";

interface BaseField {
  id?: string,
  type: FieldType,
  label: string,
  order: number
}

export interface TextField extends BaseField {
  type: FieldType.TEXT;
  placeholder?:string;
}

export interface RadioField extends BaseField {
  type: FieldType.RADIO;
  options: string[];
}

export interface CheckboxField extends BaseField {
  type: FieldType.CHECKBOX;
  options: string[];
}

export interface SelectField extends BaseField {
  type: FieldType.DROPDOWN;
  placeholder?:string;
  options: string[];
}

export interface FileUploadField extends BaseField {
  type: FieldType.FILE;
}

export interface TextareaField extends BaseField {
  type: FieldType.TEXTAREA;
  placeholder?:string;
}