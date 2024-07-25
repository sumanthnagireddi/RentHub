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
import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { ReviewComponent } from '../../components/review/review.component';
import { RentalService } from '../../services/rental.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { v4 as uuidv4 } from 'uuid';

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
    NgFor,
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
  images: any = []
  currentImage: any
  isFavoriteItem: boolean = false
  currentratings: any = []
  rentalService = inject(RentalService);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Params) => {
      let val = data;
      this.current_id = val['id'];
      this.current_data = this.rentalService.getHomeByID(this.current_id)[0];
      this.listings = this.rentalService.posted_homes$.getValue()
      this.images = this.current_data?.unitInformation?.unit_images;
      this.rentalService.getRatings().subscribe(data => {
        this.currentratings = []
        data.forEach(rating => {
          if (rating.id === this.current_id) {
            this.currentratings.unshift(rating)
          }
        })
      })

      this.currentImage = this.images[0]
      this.isFavorite()
      this.reviewForm = this.fb.group({
        userName: ['', Validators.required],
        review: ['', Validators.required],
      });
    });
  }
  submitRating() {
    const payload = {
      id: this.current_id,
      userName: localStorage.getItem('loggedInuser'),
      review: this.reviewForm.value.review,
      reviewedOn: new Date(),
      objId: uuidv4()
    };
    this.rentalService.addToRating(payload);
    // this.current_data.ratings.push(...this.rentalService.ratings$.getValue()?.filter(data => data.id == this.current_id))
  }
  handlefavorites(id: string) {
    // this.rentalService.addToFavorite(id)
    this.rentalService.addToFavorite(id)

  }
  isFavorite() {
    this.rentalService.getFavorites().subscribe(data => {
      console.log(data);
      
      if (data.includes(this.current_id)) {
        this.isFavoriteItem = true
      } else {
        this.isFavoriteItem = false
      }
    })
  }
}
