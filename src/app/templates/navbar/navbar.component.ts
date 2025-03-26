import {  Component,  ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;

  logo:string = "assets/images/logo7.svg";


  closeMenu() {
    const navbar = this.navbarCollapse.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
