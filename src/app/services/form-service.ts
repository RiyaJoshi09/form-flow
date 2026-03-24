import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = "http://localhost:8081/formflow/"

  createForm() {}
  getAllForms() {}
  getFormById() {}
  getFormByStatus() {}
}
