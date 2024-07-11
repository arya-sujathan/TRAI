import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public dialog: MatDialog,
    private serviceObject: ServerService,
    private router: Router 
    ) {}
  openDialog(action: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { action },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        // Perform the action
      } else {
        console.log('Cancelled');
        // Handle the cancellation
      }
    });
  }
  toggleSidenav() {
    this.serviceObject.toggleSidebar(); // Toggle the sidebar
  }

  ngOnDestroy() {
    // Set sidebar state back to default value
    this.serviceObject.setSidebarState(false);
  }

  openLogout(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      // data: {  },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
