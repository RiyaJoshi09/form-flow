import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form-schema';
import { Observable } from 'rxjs';
import { ThemeService } from './theme-service';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  url = 'http://localhost:8081/formflow/';

  constructor(private http: HttpClient, private themeService : ThemeService) { }

  mapToFormSchema(rawForm: any): Form {
    return {
      id: Number(rawForm.id),
      theme: localStorage.getItem('theme') || 'theme-pink',
      title: rawForm.title,
      description: '',
      published: rawForm.status === 'active',

      sections: rawForm.sections.map((section: any, sectionIndex: number) => ({
        id:section.id,
        sectionTitle: section.title,
        sectionOrder: sectionIndex + 1,

        fields: section.fields.map((field: any, fieldIndex: number) => ({
          id:field.id,
          fieldType: field.type,
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

  private mapToBackendResponse(data: any) {
    return {
      formId: data.formId,
      response: data.response
    };
  }

  createForm(formData: any): Observable<any> {
    const mappedData = this.mapToFormSchema(formData);
    let data: any = this.http.post(this.url + 'createForm', mappedData, {
      responseType: 'text',
    })
    return data;
  }

  updateForm(formData: any): Observable<any> {
    const mappedData = this.mapToFormSchema(formData);
    let data: any = this.http.put(this.url + 'updateForm', mappedData, {
      responseType: 'text',
    })
    return data;
  }

  getFormById(id: number): Observable<Form> {
    return this.http.get<Form>(this.url + 'forms/' + id);
  }

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.url + "allForm");
  }
  getFormByStatus() { }

  submitResponse(data: any) {
    const mappedData = this.mapToBackendResponse(data);
    return this.http.post(this.url + "api/responses", mappedData);
  }

  getFormResponseById(id: number){
     return this.http.get(this.url+"api/responses/"+id);
  }
}
