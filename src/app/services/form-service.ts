import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  url = "http://localhost:8082/formflow/"


  constructor(private http: HttpClient){}

 
  getAllForms() {
    return this.http.get(this.url+"allForm");
  }

  createForm(formData: any) {
    
  }

  getFormById() {}


 
  getFormByStatus() {}
}
