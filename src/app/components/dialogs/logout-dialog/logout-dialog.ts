import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './logout-dialog.html',
  styleUrl: './logout-dialog.css',
})
export class LogoutDialog {

}
