import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getUsers()
      .subscribe(data => {
        console.log(data);
        this.users = data.users;
      }, err => {
        console.log(err);
        if(err.error.token) {
          this.tokenService.deleteToken();
          this.router.navigate(['/']);
        }
      });
  }

}
