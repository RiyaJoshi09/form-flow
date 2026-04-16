import { FieldType } from "../enums/field-type.enum";
import { CondLogicSchema } from "./cond-logic-schema";

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
    placeholder?: string,
    options?: string[],
    validations?:ValidationRules,
    fieldLogic?: CondLogicSchema
}