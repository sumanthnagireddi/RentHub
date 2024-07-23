import { Component, inject } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ApartmentCardComponent,NgFor],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  rentalService = inject(RentalService);
  favorite_items: any = [];
  ngOnInit(): void {
    const favorites = this.rentalService.getAllfavorites();
    favorites.forEach((id: string) => {
      const filtered_item = this.rentalService.getHomeByID(id)[0];
      this.favorite_items.push(filtered_item)
    });
    console.log(this.favorite_items);
  }
}
