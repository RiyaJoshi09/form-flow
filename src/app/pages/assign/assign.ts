import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatCheckboxModule, MatMenuModule],
  templateUrl: './assign.html',
  styleUrl: './assign.css',
})
export class Assign {

  formId! : string;
  form:any;

  constructor (private router : Router, 
    private route: ActivatedRoute, 
    private formService: FormService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService) {
    this.formId = this.route.snapshot.paramMap.get('id')!;
  }
  

  searchText: string = '';
  //deadline: string = '';
  selectedCount: number = 0;
  recipients: any[]= [];

ngOnInit() {
    this.formService.getFormById(this.formId).subscribe(data => {
      this.form = data;
    console.log(this.form);
      this.cd.detectChanges();
    });
    
    this.formService.getAllUsers().subscribe(data => {
      console.log(data);
     const users = data as any[];
     this.recipients = users.map(user => ({
     id: user.userId,
     name: user.username,
     selected: false
  }));
    console.log(this.recipients);
    this.cd.detectChanges();
   });
  }

  filteredRecipients() {
    return this.recipients.filter(r => r.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  updateSummary() {
    this.selectedCount = this.recipients.filter(r => r.selected).length;
  }

  assignForm() {
    if (this.selectedCount === 0) {
      this.toastr.error('Please select at least one recipient.');
      return;
    }

    // if (!this.deadline) {
    //   this.toastr.error('Please set a deadline.');
    //   return;
    // }

    this.toastr.success('Form assigned successfully');
    this.router.navigate(['/']);
  }
}
