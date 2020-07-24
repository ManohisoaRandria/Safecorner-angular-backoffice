import { Component,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-update',
  templateUrl: './dialog-confirm-update.component.html',
  styleUrls: ['./dialog-confirm-update.component.css']
})
export class DialogConfirmUpdateComponent {
  valuerOut:string = '';
  constructor(public dialogRef: MatDialogRef<DialogConfirmUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    onConfirm(){
      this.dialogRef.close(true);
    }
}
