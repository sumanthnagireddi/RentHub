import { Component, inject } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ApartmentCardComponent, NgFor],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  rentalService = inject(RentalService);
  favorite_items: any = [];
  ngOnInit(): void {
    this.rentalService.getFavorites().subscribe(data => {
      this.favorite_items = []
      data.forEach((id: any) => {
        this.rentalService.getHomes().subscribe(data => {
          const filtered_items = data.filter(item => item.id == id)
          this.favorite_items.push(filtered_items[0])
        })
      });
    })
  }
}
