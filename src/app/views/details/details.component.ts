import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  ParamMap,
  Params,
  Router,
  RouterModule,
} from '@angular/router';
import { ApartmentCardComponent } from '../../components/apartment-card/apartment-card.component';
import { CommonModule, SlicePipe } from '@angular/common';
import { ReviewComponent } from '../../components/review/review.component';
import { RentalService } from '../../services/rental.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule,
    ApartmentCardComponent,
    CommonModule,
    ReviewComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  listings: any = [];
  current_data: any;
  current_id!: string;
  reviewForm!: FormGroup;
  rentalService = inject(RentalService);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Params) => {
      let val = data;
      this.current_id = val['id'];
      this.listings = this.rentalService.getAllListings();
      this.current_data = this.rentalService.getHomeByID(this.current_id)[0];
      console.log(this.current_data);
      this.reviewForm = this.fb.group({
        userName: ['', Validators.required],
        review: ['', Validators.required],
      });
    });
  }
  submitRating() {
    const payload = {
      userName: 'User1',
      review: this.reviewForm.value.review,
      reviewedOn: new Date(),
    };
    this.rentalService.updateRatingsData(this.current_id, payload);
  }
  handlefavorites(id: string) {
    this.rentalService.addTofavorites(id);
  }
}
