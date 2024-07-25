import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: any;
  loggedInuser: any
  openMobileMenu: boolean = false
  userService = inject(UserService)
  ngOnInit(): void {
    this.userService.loggedInuser$.subscribe(data => {
      this.loggedInuser = data
    })
  }
  logout() {
    localStorage.removeItem('loggedInuser');
    this.userService.loggedInuser$.next('')

  }
}
