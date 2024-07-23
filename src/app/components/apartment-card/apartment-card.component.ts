import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-apartment-card',
  standalone: true,
  imports: [MatRippleModule, RouterModule],
  templateUrl: './apartment-card.component.html',
  styleUrl: './apartment-card.component.css',
})
export class ApartmentCardComponent {
  @Input() apartmentData: any;
  @Output() viewDetailsEventEmitter = new EventEmitter();
  @Output() addToFavoritesEvent = new EventEmitter();
  constructor(private router: Router) {}
  emitViewDetails(data: any) {
    this.router.navigate(['details', data.id]);
  }
  addTofavorites(data: any) {
    this.addToFavoritesEvent.emit(data);
  }
}
