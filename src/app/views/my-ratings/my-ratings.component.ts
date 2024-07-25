import { Component, inject } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-ratings',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './my-ratings.component.html',
  styleUrl: './my-ratings.component.css'
})
export class MyRatingsComponent {
  rentalService = inject(RentalService);
  myRatings: any = []
  reviewedItem: any
  ngOnInit(): void {
    this.rentalService.getRatings().subscribe(data => {
      this.myRatings = data
    })
  }
  getReviewedItem(id: string): string {
    const item = this.rentalService.getHomeByID(id);
    return item[0]?.unitInformation?.title
  }
}
