import { Component, inject, OnInit } from '@angular/core';

import { UsersService, AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Dependencies
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private _token$ = '';

  ngOnInit(): void {
    this.authService.token$.subscribe(value => {
      this._token$ = value;
    });
  }

  // Methods
  onUserCreateHandler() {
    const user = {
      name: 'Juan Ospina',
      email: 'jospina_test@email.es',
      password: 'ojaisa',
    };
    this.userService.create(user).subscribe({
      next: (result) => {
        console.log('[succesfully_signup]', result);
      },
      error: (error) => {
        console.log('[error_signup]', error);
      },
    });
  }

  onUserSigninHandler() {
    const signal = {
      email: 'jospina_test@email.es',
      password: 'ojaisa',
    };
    this.authService.login(signal.email, signal.password).subscribe({
      next: (response) => {;
        window.localStorage.setItem("token", response.access_token)
        this.authService.token$.emit(response.access_token);
      },
      error: (error) => {
        console.log('[error_signIn]', error);
      },
    })
  }

  onUserProfileHandler() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.authService.userProfile$.emit(response);
      },
      error: (err) => {
        console.log("[error_get_profile]", err);
      }
    })
  }
}
