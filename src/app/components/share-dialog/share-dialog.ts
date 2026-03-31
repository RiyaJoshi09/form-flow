import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-share-dialog',
  imports: [MatIcon, CommonModule],
  templateUrl: './share-dialog.html',
  styleUrl: './share-dialog.css',
})
export class ShareDialog {
link: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngAfterViewInit() {
    this.link = this.data.link;
    this.cd.detectChanges();
  }

  copyLink() {
    navigator.clipboard.writeText(this.link);
    alert("Link copied!");
  }

  closeDialog(){
   this.dialogRef.close();
  }
}
