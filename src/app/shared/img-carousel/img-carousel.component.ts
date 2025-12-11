import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  imports: [],
  templateUrl: './img-carousel.component.html',
  styleUrl: './img-carousel.component.css',
})
export class ImgCarouselComponent {


  @Input({required:true}) images!:string[];
  carousalId = "";
  constructor() {

    // set random carousal Id
    const timestamp = new Date().getTime();
    this.carousalId = timestamp.toString(16) + '-' + Math.random().toString(16).substring(2, 6);
    // ends here ~ set random carousal Id
  }
}
