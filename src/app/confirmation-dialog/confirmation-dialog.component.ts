import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
    ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceObject: ServerService
    ) {}

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  onConfirm(): void {
    this.serviceObject.postData('api/meta/close/', {}).subscribe(
      (response: any) => {
        swal.fire({
          position: 'center',
          icon: "success",
          text: 'Close Initiated!'
        });
        this.dialogRef.close(true);
      },
      (error: any) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Unable to Complete Close at the moment!'
        });
        this.dialogRef.close(true);
      }
      
    );
  }

}
