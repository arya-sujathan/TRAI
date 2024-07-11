import { Component ,ViewChild} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { routes } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ServerService } from '../server.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-layout',
  standalone: true, // Use standalone: true if the component is standalone
  imports: [RouterModule, RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  routes = routes;
  private sidebarSubscription!: Subscription;
  private breakpointSubscription!: Subscription;
  isSmallScreen = false;

  constructor(
    private serviceObject: ServerService,
    private breakpointObserver: BreakpointObserver
  ) {
    console.log('Routes:', this.routes);
    
  }

  
  ngOnInit() {
    
    // Subscribe to screen size changes
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 550px)'])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.updateSidenavState();
      });

    // Subscribe to sidebar state changes
    this.sidebarSubscription = this.serviceObject.sidebarState$.subscribe(() => {
      this.updateSidenavState();
    });
  }

  ngAfterViewInit() {
    // Ensure the sidenav state is correctly initialized
    setTimeout(() => {
      this.updateSidenavState();
    });
  }

  updateSidenavState() {
    if (this.sidenav) { // Ensure sidenav is defined
      if (this.isSmallScreen) {
        const sidebarState = this.serviceObject.getSidebarState();
        if (sidebarState) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      } else {
        this.sidenav.open();
      }
    }
  }

  ngOnDestroy() {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }





  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}

