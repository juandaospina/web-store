import { Component, inject } from '@angular/core';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private storeService: StoreService) {}

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
