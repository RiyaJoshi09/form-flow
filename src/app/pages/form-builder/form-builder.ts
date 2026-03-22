import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EditField } from '../edit-field/edit-field';

@Component({
  selector: 'app-form-builder',
  imports: [RouterLink, RouterOutlet, MatIconModule, MatCheckboxModule, CommonModule, MatDialogModule],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.css',
})
export class FormBuilder {
  formFields: any[] = [];
  constructor(private dialog: MatDialog) {}

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

  editField(index:number): void{
    // open edit dialog box and edit the copy of it until saved
    const fieldCopy = JSON.parse(JSON.stringify(this.formFields[index]));

    const dialogRef = this.dialog.open(EditField, {
      width: '400px',
      data: fieldCopy
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //Update field with new data once saved
        this.formFields[index] = result;
      }
    })
  }
}
