import { Component, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroup } from '../create-group/create-group';
import { MatDialogModule } from '@angular/material/dialog';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, MatIconModule, MatDialogModule, FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups implements OnInit {

  constructor (private dialog : MatDialog, private formService : FormService) {}

  ngOnInit() {
    this.loadGroups();
  }

  selectedGroup : any = null;

  groups : any[] = []

  recentGroups : any[] = [];

  selectGroup(group : any) {
    this.selectedGroup = group;
  }

  openCreateGroupDialog() {
    const dialogRef = this.dialog.open(CreateGroup, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups();
      }
    });
  }

  loadGroups() {
    this.formService.getMyGroups().subscribe({
      next: (res: any) => {
        console.log('Groups API Response:', res);
        console.log('Groups Array:', res.groups); 

        this.groups = res.groups || [];

        // Sort by latest created
        this.groups.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Top 3 recent
        this.recentGroups = this.groups.slice(0, 3);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
}
