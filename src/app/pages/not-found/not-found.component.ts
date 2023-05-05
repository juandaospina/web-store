import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      <img width="500" height="500" src="./assets/svg/404.svg"/>
      <span>Página no encontrada</span>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {}
