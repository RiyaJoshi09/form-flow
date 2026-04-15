import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormService } from '../../services/form-service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormSubmission } from '../form-submission/form-submission';
import { ToastrService } from 'ngx-toastr';


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
   version_Id: number =0;

  constructor(private formService: FormService, private cd:ChangeDetectorRef, private route: ActivatedRoute, private toastr: ToastrService, private dialog: MatDialog ) {}

  ngOnInit(){
     this.formId= this.route.snapshot.paramMap.get('id')!;
     console.log(this.formId);
      this.getformDetails(this.formId);
  }

  getformDetails(formid: string){
    this.formService.getFormById(formid).subscribe((form: any) => {
        console.log(form);
        this.selectedForm = form;
        this.getallVersions();
        const version = this.versions.find(v => v.FormId === formid);
        if (version) {
           this.version_Id = version.versionId;
       }
        console.log("selected form parent id: ",this.selectedForm.mainParentId );
        this.cd.detectChanges();
      });
  }

  getallVersions(){
     this.formService.getAllVersions(this.selectedForm.mainParentId).subscribe((versions: any) => {
      console.log(versions);
      this.versions = versions;
        this.cd.detectChanges();

     });
    
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
 

  restoreVersion(formId: string, versionId: number){
    this.formService.switchVersion(formId, versionId).subscribe({
  next: (res) => {
    console.log(res);
    this.toastr.success('Version switched successfully!');
    this.getformDetails(formId);
  },
  error: (err) => {
    console.error(err);
    this.toastr.error('Failed to switch version. Please try again.');
  }
});
  }
}
