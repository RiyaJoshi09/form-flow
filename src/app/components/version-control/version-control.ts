import { Component } from '@angular/core';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-version-control',
  imports: [],
  templateUrl: './version-control.html',
  styleUrl: './version-control.css',
})
export class VersionControl {
   

  constructor(private formService: FormService) {}

  ngOninit(){
    this.formService.getAllVersions('formId').subscribe((versions) => {
      console.log(versions);
    });
  }
}
