import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCopy,
  faCopyright,
  faFolder,
  faHeadphones,
  faHome,
  faHomeAlt,
  faHomeLgAlt,
  faHouse,
  faObjectUngroup,
  faThumbsUp,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  imports: [NgClass, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(0deg)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  title = 'Dashboard';
  Copyright = faCopyright;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    //this.toggleCollapse();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}

//https://fontawesome.com/search?ip=classic&s=regular&ic=free&o=r
const navbarData = [
  {
    routeLink: 'dashboard',
    icon: faHome,
    label: 'Dashboard',
  },
  {
    routeLink: 'products',
    icon: faObjectUngroup,
    label: 'Products',
  },
  {
    routeLink: 'statistics',
    icon: faThumbsUp,
    label: 'Statistics',
  },
  {
    routeLink: 'coupens',
    icon: faCopy,
    label: 'Coupens',
  },
  {
    routeLink: 'pages',
    icon: faUser,
    label: 'Pages',
  },
  {
    routeLink: 'media',
    icon: faFolder,
    label: 'Media',
  },
  {
    routeLink: 'settings',
    icon: faHeadphones,
    label: 'Settings',
  },
];
