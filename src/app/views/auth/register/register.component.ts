import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  isSubmitted: boolean = false;
  isRegistrationSuccesful: boolean = false;
  useralreadExists: boolean = false;
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  get registerFormControl() {
    return this.registrationForm.controls;
  }
  register() {
    if (this.registrationForm.valid) {
      const { email, userName, password } = this.registrationForm.value;
      const registration = this.userService.registerUser(
        email,
        userName,
        password
      );
      console.log(registration);
      if (registration) {
        this.isRegistrationSuccesful = true;
        setTimeout(() => {
          this.isRegistrationSuccesful = false;
          this.router.navigate(['/login']);
        }, 2000);
        this.useralreadExists = false;
      } else {
        this.useralreadExists = true;
        this.isRegistrationSuccesful = false;
      }
    } else {
      this.isSubmitted = true;
    }
  }
  isControlInvalid(controlName: string) {
    const control: any = this.registrationForm?.get(controlName);
    return (
      (this.isSubmitted &&
        !this.registrationForm.value[controlName]) ||
      (control.touched && !this.registrationForm.value[controlName])
    );
  }
}
