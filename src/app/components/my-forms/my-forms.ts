import { Component } from '@angular/core';
import { FORMS_DATA } from '../../data/form-data';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-my-forms',
  imports: [MatIcon],
  templateUrl: './my-forms.html',
  styleUrl: './my-forms.css',
})
export class MyForms {

  forms = FORMS_DATA;
  totalForms=0;
  totalActive=0;
  totalRes=0;
  
  ngOnInit(){
    this.getFormData();
    this.loadSummary();
  }

  getFormData(){
    let formData=localStorage.getItem('formflow_forms');
    if(formData){
      console.log(JSON.parse(formData));
    }
  }

  loadSummary(){

    this.totalForms=this.forms.length;
    
    this.totalActive = this.forms.filter(f => f.status === 'active').length;

    this.totalRes = this.forms.reduce((sum, form) => sum + form.responses, 0);
  }

  deleteForm(id : number){
    this.forms = this.forms.filter(form => form.id !== id);
    this.loadSummary();
  }
}
