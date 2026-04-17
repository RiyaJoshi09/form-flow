import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz-marks-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './form-settings-marks.html',
})
export class FormSettingsMarks {

  constructor(
    private dialogRef: MatDialogRef<FormSettingsMarks>,
    @Inject(MAT_DIALOG_DATA) public data: {
      positiveMarks: number;
      negativeMarks: number;
    }
  ) {}

  ngOnInit() {
    this.data.positiveMarks = this.data.positiveMarks ?? 0;
    this.data.negativeMarks = this.data.negativeMarks ?? 0;
  }

  onSave() {
    if (this.data.positiveMarks < 0) {
      alert('Positive marks cannot be negative');
      return;
    }

    this.dialogRef.close(this.data);
  }
}