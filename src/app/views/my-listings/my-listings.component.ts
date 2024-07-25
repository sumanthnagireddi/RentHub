import { Component, inject } from '@angular/core';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { NgFor } from '@angular/common';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [ApartmentCardComponent, NgFor],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.css'
})
export class MyListingsComponent {
  my_items: any = [];
  rentalService = inject(RentalService);
  ngOnInit(): void {
    this.rentalService.getHomes().subscribe(data => {
      console.log(data);
      
      const filteredData = data.filter(item => item.author == 'me')
      console.log(filteredData);
      this.my_items=filteredData
    })
  }
}
