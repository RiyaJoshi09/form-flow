import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-with-me',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './shared-with-me.html',
  styleUrl: './shared-with-me.css',
})
export class SharedWithMe {

  recentForms = [
    { name: 'Form 1', date: 'Apr 4, 2026', role: 'Editor' },
    { name: 'Form 2', date: 'Apr 5, 2026', role: 'Respondent' },
    { name: 'Form 3', date: 'Apr 6, 2026', role: 'Viewer' }
  ];

  assignedForms = [
    { name: 'Survey Form', date: 'Apr 1, 2026', role: 'Editor' },
    { name: 'Feedback Form', date: 'Apr 2, 2026', role: 'Respondent' },
    { name: 'Q&A Form', date: 'Apr 3, 2026', role: 'Viewer' }
  ];

}
