import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import { ModalComponent } from '../modal/modal.component';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort'; // Import MatSort for sorting
import swal from 'sweetalert2';


export interface UserData {
  serialno: string;
  username: string;
  date_of_registration: string;
  whatsapp_number: string;
  email: string;
  broker: string;
  server_id: string;
  date_of_expiry: string;
}
export const dummyUserData: UserData[] = [
  // {
  //   serialno: '001',
  //   username: 'john_doe',
  //   date_of_registration: '01-01-2022',
  //   whatsapp_number: '1234567890',
  //   email: 'john.doe@example.com',
  //   broker: 'BrokerA',
  //   server_id: 'server01',
  //   date_of_expiry: '01-01-2023',
  // },
  // {
  //   serialno: '002',
  //   username: 'jane_smith',
  //   date_of_registration: '01-02-2022',
  //   whatsapp_number: '0987654321',
  //   email: 'jane.smith@example.com',
  //   broker: 'BrokerB',
  //   server_id: 'server02',
  //   date_of_expiry: '01-02-2023',
  // },
  // {
  //   serialno: '003',
  //   username: 'alice_jones',
  //   date_of_registration: '01-03-2022',
  //   whatsapp_number: '1122334455',
  //   email: 'alice.jones@example.com',
  //   broker: 'BrokerC',
  //   server_id: 'server03',
  //   date_of_expiry: '01-03-2023',
  // },
  // {
  //   serialno: '004',
  //   username: 'bob_brown',
  //   date_of_registration: '01-04-2022',
  //   whatsapp_number: '2233445566',
  //   email: 'bob.brown@example.com',
  //   broker: 'BrokerD',
  //   server_id: 'server04',
  //   date_of_expiry: '01-04-2023',
  // },
  // {
  //   serialno: '005',
  //   username: 'carol_white',
  //   date_of_registration: '01-05-2022',
  //   whatsapp_number: '3344556677',
  //   email: 'carol.white@example.com',
  //   broker: 'BrokerE',
  //   server_id: 'server05',
  //   date_of_expiry: '01-05-2023',
  // }
];
;
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, MatTableModule, NgIf,RouterModule, RouterOutlet,LayoutComponent,HeaderComponent,MatIcon,MatMenuModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isAsc:any = false
  @ViewChild(MatSort) sort!: MatSort; // ViewChild for MatSort

  displayedColumns: string[] = [
    'serialno',  'username', 'date_of_registration', 
    'whatsapp_number', 'email', 'broker', 
    'server_id', 'date_of_expiry'
  ];
  dataSource: MatTableDataSource<UserData>;


  constructor(private dataService: ServerService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<UserData>();
   }

  ngOnInit(): void {
   
    this.dataService.getData('api/users/account/').subscribe((response: UserData[]) => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      console.log(response, 'response', this.dataSource);
      
    },
    (error: any) => {
      swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Something Went Wrong!'
      });
    }
    );
    this.dataSource.data = dummyUserData
    
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { action },
      height:'35%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  applyFilter(filterValue: any) {
    filterValue =filterValue.target.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sortData(column: string) {
    const data = this.dataSource.data.slice(); // Create a copy of the data array
    this.dataSource.sort = this.sort; // Set the MatSort instance
  
    if (!column) {
      // If no column is provided, reset the sorting
      this.dataSource.data = data;
      return;
    }
  
    this.dataSource.data = data.sort((a, b) => {
       // Check if sorting is ascending
     
      switch (column) {
        case 'serialno':
        case 'username':
        case 'whatsapp_number':
        case 'email':
        case 'broker':
        case 'server_id':
          return this.compare(a[column], b[column], this.isAsc); // Compare string values
        case 'date_of_registration':
        case 'date_of_expiry':
          return this.compareDate(a[column], b[column], this.isAsc); // Compare date values
          
        default:
          return 0;
      }
    });
    this.isAsc=!this.isAsc

  }
  

  // Method to compare strings
  compare(a: string, b: string, isAsc: boolean) {
    console.log(isAsc);
    
    return (a < b ? -1 : 1) * (isAsc ? -1 : 1);
  }

  // Method to compare dates
  compareDate(a: string, b: string, isAsc: boolean) {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    
    return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
