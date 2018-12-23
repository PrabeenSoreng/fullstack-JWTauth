import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Auth } from '../models/auth-model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSignup() {
    this.authService.signupUser(this.signupForm.value)
      .subscribe((data: Auth) => {
        this.tokenService.setToken(data.token);
        console.log(this.tokenService.getToken());
        this.signupForm.reset();
      }, err => console.log(err));
  }

}
