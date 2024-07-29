import { Component } from '@angular/core';
// import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { CarouselComponent1 } from '../../components/carousel/carousel.component';
import { FormsModule, NgControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent1,
    ApartmentCardComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule,NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  listings: any = [];
  filtered_listings: any = []
  filterKey: string = '';
  amenities = new Set()
  showAmenities: boolean = false
  selectedAmeneities: any
  selectedPricerange: any
  constructor(private router: Router, private rentalService: RentalService) { }
  ngOnInit(): void {
    this.rentalService.getHomes().subscribe(data => {
      this.listings = data
      this.filtered_listings = this.listings
      data.forEach((item: any) => {
        if (item?.facilities?.amenities && item?.facilities?.amenities.length > 0) {
          item?.facilities?.amenities?.forEach((element: string) => {
            this.amenities.add(element)
          });
        }
      })
    })

  }
  onFilter() {
    if (this.filterKey) {
      this.filtered_listings = this.listings.filter((data: any) => {
        return data?.unitInformation?.title.toLowerCase().includes(this.filterKey.toLowerCase())
      })

    } else {
      this.filtered_listings = this.listings
    }
  }
  navigateToViewDetails(data: any) {
    this.router.navigate(['details', data.id]);
  }

  handleSelectionChange() {
    this.filtered_listings = this.listings.filter((listing: any) => {
      if (this.selectedAmeneities?.length === 0) {
        return true
      } else {
        if (listing.facilities && listing.facilities.amenities) {
          return this.selectedAmeneities?.some((amenty: any) => listing.facilities.amenities?.includes(amenty))
        }
      }
    })
  }
  handleSelectionoFPriceRange() {
    let minPrice = 0;
    let maxPrice = Infinity;
    switch (this.selectedPricerange) {
      case "0 to 9999":
        maxPrice = 9999;
        break;
      case "10000 to 24999":
        minPrice = 10000;
        maxPrice = 24999;
        break;
      case "25000 to 49999":
        minPrice = 25000;
        maxPrice = 49099;
        break;
      case "50000+":
        minPrice = 50000;
        maxPrice = Infinity
        break;
      default:
        break;
    }
    this.filtered_listings = this.listings.filter((item: any) => {
      const rent = item.rentInformation.expected_rent;
      return rent >= minPrice && rent <= maxPrice
    })
  }
}
