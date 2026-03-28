import { ChangeDetectorRef, Component } from '@angular/core';
import { FORMS_DATA } from '../../data/form-data';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShareDialog } from '../share-dialog/share-dialog';

import { FormService } from '../../services/form-service';

import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Form } from '../../interfaces/form-schema';


@Component({
  selector: 'app-my-forms',
  imports: [RouterLink, MatIcon, DatePipe, MatDialogModule, MatMenu, MatMenuTrigger],
  templateUrl: './my-forms.html',
  styleUrl: './my-forms.css',
})
export class MyForms {

  forms :any[]= [];
  totalFormsarray:any[]=[];
  totalForms=0;
  totalActive=0;
  totalRes=0;

  constructor(private dialog:MatDialog, private formService: FormService, private cd:ChangeDetectorRef){}
  
  ngOnInit(){
    this.getFormData();
  }

  getFormData(){
     this.formService.getAllForms().subscribe((data:any[])=>{
      this.forms=data;
      this.totalFormsarray=data;
      this.forms.forEach((form:any)=>{
      this.formService.getFormResponseById(form.id).subscribe((res:any)=>{
        form.responses = res.length;
        this.loadSummary();
        this.cd.detectChanges();
      });
    });
    });

  }

  loadSummary(){
    this.totalForms=this.forms.length;
    this.totalActive = this.forms.filter((f:any)=> f.published==true).length;
    this.totalRes = this.forms.reduce((sum, f:any)=> sum + (f.responses || 0), 0);
  }

  deleteForm(id : number|undefined){
    this.forms = this.forms.filter(form  => form.id !== id);
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


  filterStatus(status: String){
     if(status=="all"){
       this.getFormData();
     }
     else if(status=="published"){
       this.forms=this.totalFormsarray.filter((f:any)=> f.published==true);
       this.loadSummary();
     }
     else if(status=="draft"){
       this.forms=this.totalFormsarray.filter((f:any)=> f.published==false);
       this.loadSummary();
     }

 
  }
}
