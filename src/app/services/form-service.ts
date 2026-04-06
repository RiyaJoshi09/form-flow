import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form-schema';
import { Observable } from 'rxjs';
import { ThemeService } from './theme-service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = 'http://localhost:8082/formflow/';

  constructor(
    private http: HttpClient,
    private themeService: ThemeService,
  ) {}

  mapToFormSchema(rawForm: any): Form {
    return {
      id: rawForm.id,
      theme: localStorage.getItem('theme') || 'theme-pink',
      title: rawForm.title,
      description: rawForm.description,
      published: rawForm.pubilshed,

      sections: rawForm.sections.map((section: any, sectionIndex: number) => ({
        id: section.id,
        sectionTitle: section.title,
        sectionOrder: sectionIndex + 1,

        fields: section.fields.map((field: any, fieldIndex: number) => ({
          id: field.id,
          fieldType: field.type,
          fieldOrder: fieldIndex + 1,

          fieldConfig: {
            label: field.label,
            validations: field.validations,
            options: field.options,
            placeholder: field.placeholder,
            //Field Style
            color: field.color,
            fontSize: field.fontSize,
            bold: field.bold,
            italic: field.italic,
            underline: field.underline,
          },

          /*
          fieldStyle: {
            color: field.color,
            fontSize: field.fontSize,
            bold: field.bold,
            italic: field.italic,
            underline: field.underline
          }
          */
        })),
      })),
    };
  }

  private mapToBackendResponse(data: any) {
    return {
      formId: data.formId,
      response: data.response,
    };
  }

  createForm(formData: any): Observable<any> {
    const mappedData = this.mapToFormSchema(formData);
    const token = localStorage.getItem('token');
    let data: any = this.http.post(this.url + 'user/createForm', mappedData, {
      responseType: 'text',
    });
    return data;
  }

  updateForm(formData: any): Observable<any> {
    const mappedData = this.mapToFormSchema(formData);
    let data: any = this.http.put(this.url + 'user/updateForm/' + formData.id, mappedData, {
      responseType: 'text',
    });
    return data;
  }

  getFormById(id: string): Observable<Form> {
    return this.http.get<Form>(this.url + 'user/form/' + id);
  }

  getResponseFormById(id: string): Observable<Form> {
    return this.http.get<Form>(this.url + 'public/form/' + id);
  }

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.url + 'user/allForm');
  }
  getFormByStatus() {}

  submitResponse(data: any) {
    // const mappedData = this.mapToBackendResponse(data);

    if (data instanceof FormData) {
      data.forEach((value, key) => {
        console.log(key, value);
        if (value instanceof File) {
          console.log('File Name:', value.name);
          console.log('File Size:', value.size);
          console.log('File Type:', value.type);
        }
      });
    }

    return this.http.post(this.url + 'api/responses', data);
  }

  getFormResponseById(id: string) {
    return this.http.get(this.url + 'api/responses/' + id);
  }

  deleteFormById(id: string) {
    return this.http.patch(this.url + 'user/form/moveToTrash/' + id, {}, { responseType: 'text' });
  }

  getTrashForms() {
    return this.http.get(this.url + 'user/form/trash');
  }

  restoreForms(id: string) {
    return this.http.patch(
      this.url + 'user/form/restoreFromTrash/' + id,
      {},
      { responseType: 'text' },
    );
  }


  getAllUsers(){
    return this.http.get(this.url + 'admin/getAllUsers');
  }
}
