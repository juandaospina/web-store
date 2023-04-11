import { Component } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  public state: boolean = false;

  onState(state: boolean) {
    console.log("[state in parent]", state);
    this.state = state;
  }
}
