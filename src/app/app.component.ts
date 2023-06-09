import { Component, inject, OnInit } from '@angular/core';

import {
  UsersService,
  AuthService,
  TokenService,
  FilesService,
} from './services';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  // Dependencies
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private fileService = inject(FilesService);
  // Properties
  public hasUser: boolean = false;
  public user: User = { id: 0, name: '', email: '', password: '' };
  public img: string = '';

  ngOnInit(): void {
    this.authService.userProfile$.subscribe((user) => {
      if (user) {
        this.hasUser = true;
        this.user = user;
      }
    });
  }

  // Methods
  public onUserCreateHandler() {
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

  public onUserSigninHandler() {
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

  public onUserProfileHandler() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.authService.userProfile$.emit(response);
      },
      error: (err) => {
        console.log('[error_get_profile]', err);
      },
    });
  }

  public onDowloadPDF() {
    console.log('[download_file]');
    return this.fileService
      .getFile(
        'test.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  public onFileHandle(event: Event) {
    const element = event.target as HTMLInputElement;
    // Take file element seleted
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((response) => {
        console.log("[upload_file]", response)
      });
    }
  }
}
