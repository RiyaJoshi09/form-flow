import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-group',
  imports: [FormsModule, CommonModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './create-group.html',
  styleUrl: './create-group.css',
})
export class CreateGroup {

  groupName: string = '';
  description: string = '';
  isPrivate: boolean = false;
  imageUrl: string ='';
  maxMembers: number = 50;

  constructor(private dialogRef: MatDialogRef<CreateGroup>, private formService: FormService) {}

  createGroup() {
    if (!this.groupName || !this.description) return;

    const payload = {
      groupName: this.groupName,
      description: this.description,
      isPrivate: this.isPrivate,
      imageUrl: this.imageUrl,
      maxMembers: this.maxMembers
    };

    this.formService.createGroup(payload).subscribe({
      next: (res) => {
        console.log('Group created', res);
        this.dialogRef.close(true); // send success
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
