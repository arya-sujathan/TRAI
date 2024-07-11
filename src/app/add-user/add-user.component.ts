import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import swal from 'sweetalert2';
import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
interface Broker {
  id: number;
  name: string;
}
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterModule, RouterOutlet,LayoutComponent,HeaderComponent,MatInputModule,MatFormFieldModule,MatIcon],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})


export class AddUserComponent {
  today:any
  blnShowPassword: boolean = false;
  contentType:any = 'password'
  
  lstBroker: Broker[] = [];
  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    this.userForm.get('date_of_registration')?.setValue(this.today)  
    this.serviceObject.getData('api/users/broker/').subscribe((response: Broker[]) => {
      console.log(response)
      this.lstBroker = response
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
  userForm: FormGroup;
  userAdded: boolean = false;
  lstPlatform = [
    {value:'MT-4'},
    {value:'MT-5'},
  ]
 
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private serviceObject: ServerService,
    private router: Router 
    ) {
    this.userForm = this.fb.group({
      account_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [ Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
      whatsapp_number: ['', [ Validators.pattern(/^[0-9]+$/)]],
      broker: ['', Validators.required],
      server_id: ['', Validators.required],
      date_of_registration: ['',Validators.required],
      lot_size: ['', Validators.required],
      password: ['', Validators.required],
      platform: ['', Validators.required],
      is_active:[true],
      created_on:['2024-07-06'],
      modified_on:['2024-07-06'],
      is_staff:[false],
      is_superuser:[false]
            
    });
  }
  openDialog(action: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { action },
      height:'450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  onSubmit() {
    console.log('values', this.userForm.value);
  
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      this.userAdded = true;
      this.serviceObject.postData('api/users/account/', this.userForm.value).subscribe(
        (response: any) => {
          swal.fire({
            position: 'center',
            icon: "success",
            text: 'User Added Successfully!'
          });
          this.router.navigate(['/userlist']);
        },
        (error: any) => {
          swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Something Went Wrong!'
          });
        }
      );
    } else {
      // Mark all fields as touched
      console.log('invalid');
      
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  
  
  onCancel() {
    console.log(this.userForm.value);
    
    this.userForm.reset();
    this.userForm.get('date_of_registration')?.setValue(this.today)
  }
  

togglePasswordVisibility() {
  this.blnShowPassword = !this.blnShowPassword;
  if(this.blnShowPassword){
    this.contentType = 'text'
  }
  else{
    this.contentType='password'
  }
}
}


