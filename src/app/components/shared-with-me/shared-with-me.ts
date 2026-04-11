import { ChangeDetectorRef, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { FormService } from '../../services/form-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormSubmission } from '../../pages/form-submission/form-submission';


@Component({
  selector: 'app-shared-with-me',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './shared-with-me.html',
  styleUrl: './shared-with-me.css',
})
export class SharedWithMe {

  recentForms : any[] = [];

  assignedForms : any[] = [];

  filteredForms: any[] = [];        
  searchText: string = '';

  paginatedForms: any[] = [];     // current page data
  currentPage: number = 1;
  itemsPerPage: number = 3;       // per page kitne items dikhane hai
  totalPages: number = 1;

  totalAssigned: number = 0;
  totalRecent: number = 0;
  totalResponder: number = 0;
  totalViewer: number = 0;
  totalEditor: number = 0;

  roleFilter : string = '';

  constructor(private formService: FormService, 
    private cd:ChangeDetectorRef, 
    private router: Router, 
    private dialog: MatDialog){}
  ngOnInit() {
    this.formService.getSharedForms().subscribe({
      next: (data: any) => {
        console.log("Shared Forms:", data);
        this.recentForms = this.sortFormsByDate(data.newForms || []);
        this.assignedForms = this.sortFormsByDate(data.otherForms || []);
        this.filteredForms = [...this.assignedForms];

        const allForms = [...this.recentForms, ...this.assignedForms];
        this.totalAssigned = allForms.length;
        this.totalRecent = this.recentForms.length;
        this.totalResponder = allForms.filter(f => f.role === 'RESPONDER').length;
        this.totalViewer = allForms.filter(f => f.role === 'VIEWER').length;
        this.totalEditor = allForms.filter(f => f.role === 'EDITOR').length;
        
        this.loadPagination();
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error("Error fetching shared forms:", error);
      }
    });   
    
  }

sortFormsByDate(forms: any[]) {
  return forms.sort((a, b) => 
    new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
  );
}

applyFilters() {
  const searchValue = this.searchText.toLowerCase();
  const roleValue = this.roleFilter.toLowerCase();

  this.filteredForms = this.assignedForms.filter(form => {
  const matchesSearch = form.formName.toLowerCase().includes(searchValue);

  const matchesRole = roleValue ? form.role?.toLowerCase().includes(roleValue) : true;

    return matchesSearch && matchesRole;
  });

  this.filteredForms = this.sortFormsByDate(this.filteredForms);

  this.currentPage = 1;
  this.loadPagination();
}


openAssignment(role: string , formId: string){
    if(role=='RESPONDER'){
        window.open('/form/' + formId, '_blank');
    }
    else if(role=='VIEWER'){
        this.formService.getFormById(formId).subscribe(data => {

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

    else if(role=='EDITOR'){
        window.open('/edit-form/' + formId, '_blank');
    }
}


loadPagination() {
  this.totalPages = Math.ceil(this.filteredForms.length / this.itemsPerPage);
  this.updatePaginatedForms();
}

updatePaginatedForms() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  this.paginatedForms = this.filteredForms.slice(start, end);
}

goToPage(page: number) {
  this.currentPage = page;
  this.updatePaginatedForms();
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedForms();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedForms();
  }
}


// resetSearch() {
//   this.searchText = '';
//   this.filteredForms = this.assignedForms;  
// }

}
