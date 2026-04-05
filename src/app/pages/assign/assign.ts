import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatCheckboxModule, MatMenuModule],
  templateUrl: './assign.html',
  styleUrl: './assign.css',
})
export class Assign {

  formId! : string;

  constructor (private router : Router, private route: ActivatedRoute) {
    this.formId = this.route.snapshot.paramMap.get('id')!;
  }

  searchText: string = '';
  deadline: string = '';
  selectedCount: number = 0;

  recipients = [
    { name: 'Customers', selected: false },
    { name: 'IT Team', selected: false },
    { name: 'HR Team', selected: false },
    { name: 'All Staff', selected: false }
  ];

  filteredRecipients() {
    return this.recipients.filter(r => r.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  updateSummary() {
    this.selectedCount = this.recipients.filter(r => r.selected).length;
  }

  assignForm() {
    if (this.selectedCount === 0) {
      alert('Please select at least one recipient.');
      return;
    }

    if (!this.deadline) {
      alert('Please set a deadline.');
      return;
    }

    alert(`Form assigned successfully`);

    this.router.navigate(['/']);
  }
}
