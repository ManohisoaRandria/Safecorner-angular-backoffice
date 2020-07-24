import { Component ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-affiche',
  templateUrl: './dialog-affiche.component.html',
  styleUrls: ['./dialog-affiche.component.css']
})
export class DialogAfficheComponent {

  constructor(public dialogRef: MatDialogRef<DialogAfficheComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

}
