import { FieldStyleSchema } from "./field-style-schema";
import { FormSettingsSchema } from "./form-settings-schema";

export interface Field {
  id?:string;
  fieldType: string;
  fieldOrder: number;
  fieldConfig: {};
  fieldStyle: FieldStyleSchema;
}

export interface Section {
  id?:string;
  sectionTitle: string;
  sectionOrder: number;
  fields: Field[];
}

export interface Form {
  id?: string;
  userId?:number;
  createdBy?: string;
  theme:string;
  title: string;
  description: string;
  published: boolean;
  settings?: FormSettingsSchema;
  sections: Section[];
}

/*
  {
    "id": "1774364612698",
    "title": "Data Form",
    "sections": [
      {
        "id": "1774364208860",
        "title": "Required Data",
        "fields": [
          {
            "id": 7,
            "type": "text",
            "label": "Name",
            "validations": {
              "required": true,
              "minLength": 3,
              "maxLength": 30
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 8,
            "type": "text",
            "label": "Email",
            "validations": {
              "required": true,
              "minLength": 3,
              "maxLength": 50,
              "email": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 1,
            "type": "text",
            "label": "Enter your phone number",
            "validations": {
              "required": true,
              "minLength": 10,
              "maxLength": 10
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 2,
            "type": "checkbox",
            "label": "Skills",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 4,
            "type": "radio-button",
            "label": "Gender",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 5,
            "type": "select-card",
            "label": "country",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 3,
            "type": "file-upload",
            "label": "upload docs",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 6,
            "type": "text-area",
            "label": "Remarks",
            "validations": {
              "required": true,
              "minLength": 10,
              "maxLength": 100
            },
            "options": [],
            "placeholder": ""
          }
        ]
      },
      {
        "id": "1774364382015",
        "title": "Alternative Data",
        "fields": [
          {
            "id": 3,
            "type": "text",
            "label": "alternative email",
            "validations": {
              "email": true
            },
            "options": [],
            "placeholder": ""
          },
          {
            "id": 1,
            "type": "text",
            "label": "Alternative phone no",
            "validations": {
              "minLength": 10,
              "maxLength": 10
            },
            "options": [],
            "placeholder": ""
          }
        ]
      }
    ],
    "status": "active",
    "responses": 0,
    "createdAt": "2026-03-24T15:03:32.698Z"
  }
*/


// Data Type : Form
/*
{
  "id": 1774364612698,
  "title": "Data Form",
  "description": "",
  "published": true,
  "sections": [
    {
      "sectionTitle": "Required Data",
      "sectionOrder": 1,
      "fields": [
        {
          "fieldType": "text",
          "fieldOrder": 1,
          "fieldConfig": {
            "label": "Name",
            "validations": {
              "required": true,
              "minLength": 3,
              "maxLength": 30
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "text",
          "fieldOrder": 2,
          "fieldConfig": {
            "label": "Email",
            "validations": {
              "required": true,
              "minLength": 3,
              "maxLength": 50,
              "email": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "text",
          "fieldOrder": 3,
          "fieldConfig": {
            "label": "Enter your phone number",
            "validations": {
              "required": true,
              "minLength": 10,
              "maxLength": 10
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "checkbox",
          "fieldOrder": 4,
          "fieldConfig": {
            "label": "Skills",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "radio-button",
          "fieldOrder": 5,
          "fieldConfig": {
            "label": "Gender",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "select-card",
          "fieldOrder": 6,
          "fieldConfig": {
            "label": "country",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "file-upload",
          "fieldOrder": 7,
          "fieldConfig": {
            "label": "upload docs",
            "validations": {
              "required": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "text-area",
          "fieldOrder": 8,
          "fieldConfig": {
            "label": "Remarks",
            "validations": {
              "required": true,
              "minLength": 10,
              "maxLength": 100
            },
            "options": [],
            "placeholder": ""
          }
        }
      ]
    },
    {
      "sectionTitle": "Alternative Data",
      "sectionOrder": 2,
      "fields": [
        {
          "fieldType": "text",
          "fieldOrder": 1,
          "fieldConfig": {
            "label": "alternative email",
            "validations": {
              "email": true
            },
            "options": [],
            "placeholder": ""
          }
        },
        {
          "fieldType": "text",
          "fieldOrder": 2,
          "fieldConfig": {
            "label": "Alternative phone no",
            "validations": {
              "minLength": 10,
              "maxLength": 10
            },
            "options": [],
            "placeholder": ""
          }
        }
      ]
    }
  ]
}
*/