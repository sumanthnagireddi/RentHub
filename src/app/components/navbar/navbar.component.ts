import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: any;
  loggedInuser:any
  openMobileMenu:boolean=false
  ngOnInit(): void {
    this.loggedInuser =localStorage.getItem('loggedInuser');
  }
  logout(){
    localStorage.removeItem('loggedInuser');
    this.loggedInuser=''
  }
}
