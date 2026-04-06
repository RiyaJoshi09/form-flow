import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormSettingsSchema } from '../../interfaces/form-settings-schema';

@Component({
  selector: 'app-form-settings-dialog',
  imports: [MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    CommonModule, 
    FormsModule,
    MatDatepickerModule,
    MatSlideToggleModule
    ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './form-settings-dialog.html',
  styleUrl: './form-settings-dialog.css',
})
export class FormSettingsDialog {
  constructor(
    public dialogRef: MatDialogRef<FormSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FormSettingsSchema
  ){
    if(!this.data){
      this.data = {};
    }
  }
}
