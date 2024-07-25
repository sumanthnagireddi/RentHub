import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RentalService } from '../../services/rental.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { take, toArray } from 'rxjs';


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
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    navSpeed: 700,
    navText: ['', ''],
    autoHeight: true,
    autoWidth: true,
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
      1024: {
        items: 1
      },
      1280: {
        items: 1
      }
    },
    nav: false
  };
  top_listings: any = [];
  rentalService = inject(RentalService);
  router = inject(Router)
  ngOnInit(): void {
    this.rentalService.getHomes().subscribe(
      (data: any) => {
        this.top_listings = data.slice(0, 3)
      }
    )
  }
  navigate(id: string) {
    this.router.navigate(['details', id]);
  }
  formatAmeneties(data: string[]): string {
    if (!data || data.length === 0) {
      return ''
    } else if (data.length <= 2) {
      return data.join(',')
    } else {
      const toDisplay = data.slice(0, 2).join(',')
      const remainingCount = data.length - 2;
      return `${toDisplay} +${remainingCount} more`
    }
  }
}
