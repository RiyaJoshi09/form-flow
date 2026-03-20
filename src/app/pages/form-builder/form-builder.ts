import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { generate, identity } from 'rxjs';

@Component({
  selector: 'app-form-builder',
  imports: [RouterLink, RouterOutlet, MatIconModule, MatCheckboxModule, CommonModule],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.css',
})
export class FormBuilder {
  formFields: any[] = [];

  addField(type:string){
    // To add field to canvas
    const newField = {
      id: Date.now().toString(), //change it
      type: type, //change it
      label: `New ${type} Field`, // change it
    };
    this.formFields.push(newField)
  }

  removeField(index:number){
    // To remove field from canvas
    this.formFields.splice(index, 1);
  }
}
