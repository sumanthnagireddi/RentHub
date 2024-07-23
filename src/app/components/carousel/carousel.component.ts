import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: true,
    mouseDrag: true,
    autoWidth: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  top_listings: any = [];
  rentalService=inject(RentalService)
  ngOnInit(): void {
    this.top_listings=this.rentalService.getAllListings()?.slice(0,3)
  }
}
