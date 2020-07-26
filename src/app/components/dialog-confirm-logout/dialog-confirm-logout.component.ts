import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-logout',
  templateUrl: './dialog-confirm-logout.component.html',
  styleUrls: ['./dialog-confirm-logout.component.css']
})
export class DialogConfirmLogoutComponent{

  constructor(public dialogRef: MatDialogRef<DialogConfirmLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    onConfirm(){
      this.dialogRef.close(true);
    }

}
