import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  userService = inject(UserService);
  fb = inject(FormBuilder);
  isLoginSuccesful: boolean = false;
  router = inject(Router);
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      const loginStatus = this.userService.loginUser(userName, password);
      console.log(loginStatus);
      if (loginStatus == true) {
        this.isLoginSuccesful = true;
        localStorage.setItem('loggedInuser', userName);
        this.router.navigate(['/']);
      } else {
        alert(loginStatus);
        this.isLoginSuccesful = false;
      }
    } else {
      this.isSubmitted = true;
    }
  }
}
