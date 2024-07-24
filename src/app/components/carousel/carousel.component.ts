import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RentalService } from '../../services/rental.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent1 {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoHeight:true,
    autoWidth:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1024:{
        items:1
      },
      1280:{
        items:1
      }
    },
    nav: true
  };
  top_listings: any = [];
  rentalService = inject(RentalService);
  ngOnInit(): void {
    this.top_listings = this.rentalService.getAllListings()?.slice(0, 3);
   
  }
}
