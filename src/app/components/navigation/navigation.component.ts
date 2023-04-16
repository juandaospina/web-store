import { Component, inject } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {
    this.authService.userProfile$.subscribe((value) => {
      this.user = value;
    });
  }

  // Properties
  public user: User = { id: 0, name: '', email: '', password: '' };
  public activeMenu: boolean = false;
  public productsCounter: number = 0;
  // public shoppingCart$ = this.storeService._cart$
  // public storeService = inject(StoreService);

  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.productsCounter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
