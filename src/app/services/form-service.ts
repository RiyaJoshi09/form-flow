import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = "http://localhost:8081/formflow/"

  constructor(private http: HttpClient){}

  createForm() {}
  getAllForms() {
    return this.http.get(this.url+"allForm");
  }
  getFormById() {}
  getFormByStatus() {}
}
