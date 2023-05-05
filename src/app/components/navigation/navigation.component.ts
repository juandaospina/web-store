import { Component, inject } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/types/user';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
  ) {
    this.authService.userProfile$.subscribe((value) => {
      this.user = value;
    });
  }

  // Properties
  public user: User = { id: 0, name: '', email: '', password: '' };
  public activeMenu: boolean = false;
  public productsCounter: number = 0;
  public categories: Category[] = [];

  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.productsCounter = products.length;
    });

    this.getAllCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (result) => {
        this.categories = result
      },
      error: (error) => console.log("[get_all_categories]", error)
    })
  }
}
