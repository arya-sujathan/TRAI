import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
    ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  form: FormGroup;
  action: string;
  url!: string;
  msg!: string;

constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private serviceObject: ServerService

  ) {
    this.form = this.fb.group({
      stopLoss: ['', Validators.required],
      target: ['', Validators.required]
    });
    this.action = data.action;
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.action === 'buy') {
        this.url = 'api/meta/buy/';
        this.msg = 'Buy operation initiated!'
      } else{
        this.url = 'api/meta/sell/';
        this.msg = 'Sell operation initiated!'
      }
    this.serviceObject.postData(this.url, this.form.value).subscribe(
      (response: any) => {
        swal.fire({
          position: 'center',
          icon: "success",
          text: this.msg
        });
        this.dialogRef.close();
      },
      (error: any) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Something Went Wrong!'
        });
      }
    );
  }
}
  onNoClick(): void {
    this.dialogRef.close();
  }
}