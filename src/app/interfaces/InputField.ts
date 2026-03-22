import { FieldType } from "../enums/field-type.enum";

interface BaseField {
  id?: string,
  type: FieldType,
  label: string,
  order: number
}

export interface TextField extends BaseField {
  type: FieldType.TEXT;
}

export interface RadioField extends BaseField {
  type: FieldType.RADIO;
  config: {
    options: string[];
  };
}

export interface CheckboxField extends BaseField {
  type: FieldType.CHECKBOX;
  config: {
    options: string[];
  };
}

export interface SelectField extends BaseField {
  type: FieldType.SELECT;
  config: {
    options: string[];
  };
}

export interface FileUploadField extends BaseField {
  type: FieldType.FILE_UPLOAD;
}

export interface TextareaField extends BaseField {
  type: FieldType.TEXTAREA;
}