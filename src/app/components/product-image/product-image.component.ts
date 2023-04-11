import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() img!: string;
  public imageDefault: string = '';

  imgError() {
    this.imageDefault =
      'https://edteam-media.s3.amazonaws.com/blogs/original/152d4886-6290-4084-8de9-28a382fd40d1.png';
  }

  imgLoaded() {}
}