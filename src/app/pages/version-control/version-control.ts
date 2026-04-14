import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormService } from '../../services/form-service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormSubmission } from '../form-submission/form-submission';


@Component({
  selector: 'app-version-control',
  imports: [MatIcon, NgClass, DatePipe, CommonModule, RouterLink],
  templateUrl: './version-control.html',
  styleUrl: './version-control.css',
})
export class VersionControl {
  
  formId : any;
  selectedForm: any ; // default to first form
   versions: any[] = [];

  constructor(private formService: FormService, private cd:ChangeDetectorRef, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(){
     this.formId= this.route.snapshot.paramMap.get('id')!;
     console.log(this.formId);
        this.formService.getFormById(this.formId).subscribe((form: any) => {
        console.log(form);
        this.selectedForm = form;
        this.formService.getAllVersions(this.selectedForm.mainParentId).subscribe((versions: any) => {
      console.log(versions);
      this.versions = versions;
        this.cd.detectChanges();
    });
        console.log("selected form parent id: ",this.selectedForm.mainParentId );
        this.cd.detectChanges();
      });
     
     
  }


  getFormById(formId: string){
    
  }

  viewVersion(versionId: string){
    this.formService.getFormById(versionId).subscribe(data => {
    
        const previewData = {
          title: data.title,
          description: data.description,
          sections: data.sections.map((section: any, sIndex: number) => ({
            sectionTitle: section.sectionTitle,
            sectionOrder: section.sectionOrder || (sIndex + 1),
    
            fields: section.fields.map((field: any, fIndex: number) => ({
              fieldType: field.fieldType, // ⚠️ check this name
              fieldOrder: field.fieldOrder || (fIndex + 1),
              id: field.id || `temp_${fIndex}`,
    
              fieldConfig: {
                label: field.fieldConfig?.label,
                placeholder: field.fieldConfig?.placeholder,
                options: field.fieldConfig?.options || [],
                validations: field.fieldConfig?.validations || {},
              },
    
              fieldStyle: {
                color: field.fieldStyle?.color,
                fontSize: field.fieldStyle?.fontSize,
                bold: field.fieldStyle?.bold,
                italics: field.fieldStyle?.italics,
                underline: field.fieldStyle?.underline
              }
            }))
          })),
          isReadOnly: true
        };
       
    
        this.dialog.open(FormSubmission, {
           width: '90vw',
           height: '90vh',
           data: previewData, 
            });
    
            this.cd.detectChanges();
          })
  }
 
}
