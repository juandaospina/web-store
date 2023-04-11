import { Component, inject } from '@angular/core';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public storeService = inject(StoreService);
  public activeMenu: boolean = false;
  public productsCounter: number = 0;

  ngOnInit(): void {
    this.storeService._cart$.subscribe(products => {
      this.productsCounter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    console.log("[toggle_menu]", this.activeMenu)
  }
}
