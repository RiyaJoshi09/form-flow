import { Component } from '@angular/core';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-shared-with-me',
  imports: [],
  templateUrl: './shared-with-me.html',
  styleUrl: './shared-with-me.css',
})
export class SharedWithMe {
  constructor(private formService: FormService){}

  ngOnInit() {
    this.formService.getSharedForms().subscribe({
      next: (data) => {
        console.log("Shared Forms:", data);
      },
      error: (error) => {
        console.error("Error fetching shared forms:", error);
      }
    });   
}
}
