import { Component, inject, OnInit } from '@angular/core';

import { UsersService, AuthService, TokenService } from './services';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
  ) {}
  // Dependencies
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  // Properties
  public hasUser: boolean = false;
  public user: User = { id: 0, name: '', email: '', password: '' };

  ngOnInit(): void {
    this.authService.userProfile$.subscribe((user) => {
      if (user) {
        this.hasUser = true;
        this.user = user;
      }
    });
  }

  // Methods
  onUserCreateHandler() {
    const user = {
      name: 'Samuel Ospina',
      email: 'sospina_test@email.es',
      password: 'ojaisa',
    };
    this.userService.create(user).subscribe({
      next: (result) => {
        console.log('[succesfully_signup]', result);
        // window.localStorage.setItem('user', JSON.stringify(user));
      },
      error: (error) => {
        console.log('[error_signup]', error);
      },
    });
  }

  onUserSigninHandler() {
    const signal = {
      email: 'sospina_test@email.es',
      password: 'ojaisa',
    };
    this.authService.login(signal.email, signal.password).subscribe({
      next: (response) => {
        window.localStorage.setItem('user', JSON.stringify(signal));
        this.authService.userProfile$.emit(signal);
        this.tokenService.saveToken(response.access_token);
        // window.localStorage.setItem("token", response.access_token)
        // this.authService.token$.emit(response.access_token);
      },
      error: (error) => {
        console.log('[error_signIn]', error);
      },
    });
  }

  onUserProfileHandler() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.authService.userProfile$.emit(response);
      },
      error: (err) => {
        console.log('[error_get_profile]', err);
      },
    });
  }
}
