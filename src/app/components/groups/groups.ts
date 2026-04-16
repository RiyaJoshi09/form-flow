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

  searchText: string = '';
  filteredGroups: any[] = [];

  paginatedGroups: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  members : any[] = [];

  selectGroup(group : any) {
    this.selectedGroup = group;

    this.formService.getGroupMembers(group.groupId).subscribe({
      next: (res: any) => {
        this.members = res.members || [];
        console.log('Members:', this.members);
      },
      error: (err) => {
        console.error(err);
        this.members = [];
      }
    });
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

        this.filteredGroups = [...this.groups];

        this.currentPage = 1;
        this.loadPagination();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSearch() {
    const value = this.searchText.toLowerCase();

    this.filteredGroups = this.groups.filter(group =>
      group.groupName.toLowerCase().includes(value)
    );

    this.currentPage = 1;
    this.loadPagination();
  }

  loadPagination() {
    this.totalPages = Math.ceil(this.filteredGroups.length / this.itemsPerPage);
    this.updatePaginatedGroups();
  }

  updatePaginatedGroups() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.paginatedGroups = this.filteredGroups.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedGroups();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedGroups();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedGroups();
    }
  }

  addMembers() {
    if (!this.selectedGroup) return;

    const usernames = prompt('Enter usernames (comma separated):');

    if (!usernames) return;

    const memberList = usernames.split(',').map(u => u.trim());

    this.formService.addMembersToGroup(this.selectedGroup.groupId, memberList)
      .subscribe({
        next: () => {
          alert('Members added successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Error adding members');
        }
      });
  }
  
}
