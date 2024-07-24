import { Component } from '@angular/core';
// import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { CarouselComponent1 } from '../../components/carousel/carousel.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent1,
    ApartmentCardComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  listings: any = [];
  constructor(private router: Router, private rentalService: RentalService) {}
  ngOnInit(): void {
    this.listings = this.rentalService.getAllListings();
  }
  navigateToViewDetails(data: any) {
    this.router.navigate(['details', data.id]);
  }
}
