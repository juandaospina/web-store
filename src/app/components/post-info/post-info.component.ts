import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  @Input() state!: boolean;
  @Output() setState = new EventEmitter<boolean>();

  ngOnInit() {
    console.log('[initial_state]', this.state);
  }

  onHandlerState(): void {
    this.state = !this.state;
    this.setState.emit(this.state)
  }
}
