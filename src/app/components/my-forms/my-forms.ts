import { Component } from '@angular/core';
import { FORMS_DATA } from '../../data/form-data';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShareDialog } from '../share-dialog/share-dialog';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-my-forms',
  imports: [MatIcon, DatePipe, MatDialogModule],
  templateUrl: './my-forms.html',
  styleUrl: './my-forms.css',
})
export class MyForms {

  forms :any[]= [];
  totalForms=0;
  totalActive=0;
  totalRes=0;

  constructor(private dialog:MatDialog, private formService: FormService){}
  
  ngOnInit(){
    this.getFormData();
    this.loadSummary();
  }

  getFormData(){
     this.formService.getAllForms().subscribe((data:any)=>{
      console.log(data);
      this.forms=data;
    });

  }

  loadSummary(){
    this.totalForms=this.forms.length;
    this.totalActive = this.forms.length;
    this.totalRes = 0;
  }

  deleteForm(id : number){
    this.forms = this.forms.filter(form => form.id !== id);
    localStorage.setItem('formflow_forms', JSON.stringify(this.forms));
    this.loadSummary();
  }


  shareForm(id: number){
  const link = `${window.location.origin}/form/${id}`;

  console.log("Dialog open ho raha hai");

  this.dialog.open(ShareDialog, {
    width: '500px',
    height: '150px',
    data: { link: link }
  });

  }
}
