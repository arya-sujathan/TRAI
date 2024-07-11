import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  form: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<LogoutComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        field1: ['', Validators.required],
        field2: ['', Validators.required]
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }