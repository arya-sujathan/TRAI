import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerService } from '../server.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule], // Remove FormsModule, use ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 
})
export class LoginComponent {
  loginForm: FormGroup;
  loginData = {}

  constructor(
    private fb: FormBuilder,
     private serviceObject: ServerService,
     private spinner: NgxSpinnerService,
     private router: Router 
     ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Prevent form submission if invalid
    }

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    if (credentials.username && credentials.password) {
      this.loginData = {
        username: credentials.username,
        password: credentials.password
      };

      this.spinner.show();

      this.serviceObject.getloginCheck('api/users/login/', this.loginData).subscribe(
        (response: any) => {
          this.spinner.hide();
          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('username', credentials.username);
          localStorage.setItem('Email', response.email);
          localStorage.setItem('refreshToken', response.refresh)
          this.router.navigate(['/userlist']);
        },
        (error: any) => {
          swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Invalid username or password'
          });
          this.spinner.hide();
        }
      );
    } else {
      swal.fire({
        title: 'Error',
        text: 'Username and password are mandatory',
        icon: 'error',
        showConfirmButton: false,
        // timer: 2000
      });
    }



    console.log('Username:', credentials.username);
    console.log('Password:', credentials.password);
  }
}
