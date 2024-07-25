import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-apartment-card',
  standalone: true,
  imports: [MatRippleModule, RouterModule, JsonPipe,NgIf],
  templateUrl: './apartment-card.component.html',
  styleUrl: './apartment-card.component.css',
})
export class ApartmentCardComponent {
  @Input() apartmentData: any;
  @Output() viewDetailsEventEmitter = new EventEmitter();
  @Output() addToFavoritesEvent = new EventEmitter();
  isFavoriteItem: boolean = false
  constructor(private router: Router, private rentalService: RentalService) { }
  ngOnInit(): void {
    this.isFavorite() 
  }
  emitViewDetails(data: any) {
    this.router.navigate(['details', data.id]);
  }
  addTofavorites(data: any) {
    this.rentalService.addToFavorite(data.id)
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
  isFavorite() {
    this.rentalService.getFavorites().subscribe(data => {
      if (data.includes(this.apartmentData.id)) {
        this.isFavoriteItem = true
      }else{
        this.isFavoriteItem=false
      }
    })
  }
}
