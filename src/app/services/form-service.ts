import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form-schema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = 'http://localhost:8082/formflow/';
  constructor(private http: HttpClient) {}

  getFieldType(type: string) {
    const typeMap: Record<string, string> = {
      'text': 'TEXT',
      'checkbox': 'CHECKBOX',
      'file-upload': 'FILE',
      'radio-button': 'RADIO',
      'select-card': 'DROPDOWN',
      'text-area': 'TEXTAREA',
    };

    return typeMap[type];
  }

  mapFromBackend(dto: any): Form {
    return {
      id: dto.id,
      theme: dto.theme,
      title: dto.title,
      description: dto.description,
      published: dto.published,
      createdBy: dto.createdBy,

      sections: dto.sections
        ?.sort((a: any, b: any) => a.sectionOrder - b.sectionOrder)
        .map((section: any) => ({
          sectionTitle: section.sectionTitle,
          sectionOrder: section.sectionOrder,

          fields: section.fields
            ?.sort((a: any, b: any) => a.fieldOrder - b.fieldOrder)
            .map((field: any) => ({
              fieldType: field.fieldType,
              fieldOrder: field.fieldOrder,

              fieldConfig: {
                label: field.fieldConfig?.label ?? '',
                validations: field.fieldConfig?.validations ?? {},
                options: field.fieldConfig?.options ?? [],
                placeholder: field.fieldConfig?.placeholder ?? '',
              },
            })),
        })),
    };
  }
  mapToFormSchema(rawForm: any): Form {
    return {
      id: Number(rawForm.id),
      theme: localStorage.getItem('theme') || 'theme-pink',
      title: rawForm.title,
      description: '',
      published: rawForm.status === 'active',

      sections: rawForm.sections.map((section: any, sectionIndex: number) => ({
        sectionTitle: section.title,
        sectionOrder: sectionIndex + 1,

        fields: section.fields.map((field: any, fieldIndex: number) => ({
          fieldType: this.getFieldType(field.type),
          fieldOrder: fieldIndex + 1,

          fieldConfig: {
            label: field.label,
            validations: field.validations,
            options: field.options,
            placeholder: field.placeholder,
          },
        })),
      })),
    };
  }
  createForm(formData: any): Observable<any> {
    const mappedData = this.mapToFormSchema(formData);
    let data: any = this.http.post(this.url + 'createForm', mappedData, {
      responseType: 'text',
    });
    data.subscribe((x: string) => {
      console.log(x);
    });
    return data;
  }

  getFormById(id: number): Observable<Form> {
    return this.http.get<Form>(this.url + 'forms/' + id);
  }

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.url+"allForm");
  }
  getFormByStatus() {}
}
