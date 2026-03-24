import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = "http://localhost:8081/formflow/"

  createForm(formData: any) {
    
  }

  getFormById() {}


  getAllForms() {}
  getFormByStatus() {}
}
