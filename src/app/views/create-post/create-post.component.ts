import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { map, Observable, reduce } from 'rxjs';
import { RentalService } from '../../services/rental.service';
import { v4 as uuidv4 } from 'uuid';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  rent_form!: FormGroup;
  amenities_included: string[] = [
    'Gym/Fitness Center',
    'Swimming Pool',
    'Car Parking',
    'Visitors Parking',
    'Power Backup',
    'Garbage Disposal',
    'Private Lawn',
    'Water Heater',
    'Plant Security System',
    'Laundry Service',
    'Elevator',
    'Club House',
  ];
  stepperOrientation!: Observable<StepperOrientation>;

  amenties_selected: string[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private rentalService: RentalService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.rent_form = this._formBuilder.group({
      unitInformation: this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        unit_type: ['', Validators.required],
        unit_name: ['', Validators.required],
        shared_property: [''],
        unit_area: [''],
        unit_availability: ['', Validators.required],
        unit_address: ['', Validators.required],
        unit_images: ['', Validators.required],
      }),
      rentInformation: this._formBuilder.group({
        expected_rent: ['', Validators.required],
        rent_negotiable: [''],
        stay_type: [''],
        late_charges: [''],
        minimum_down_payment: [''],
      }),
      facilities: this._formBuilder.group({
        furnished: [''],
        amenties: [''],
      }),
    });
  }
  uploadImages(event: any) {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.rent_form
            .get('unitInformation')
            ?.get('unit_images')
            ?.setValue([
              ...this.rent_form?.value?.unitInformation?.unit_images,
              event.target?.result,
            ]);
        };
        reader.readAsDataURL(file);
      });
    }
  }
  removePicture(index: number) {
    this.rent_form?.value?.unitInformation?.unit_images.splice(index, 1);
  }
  saveData(tab: string) {
    if (tab == 'basic') {
      if (this.rent_form.get('unitInformation')?.valid) {
        console.log('valid');
      } else {
        console.log('not valid');
      }
      console.log(this.rent_form.value);
      this.rentalService.createNewPost({
        id: uuidv4(),
        ...this.rent_form.value,
        author: 'me',
      });
    }
  }
  handleAmenities(value: string) {
    if (this.amenties_selected && this.amenties_selected.includes(value)) {
      let filtered_items = this.amenties_selected.filter((am) => am != value);
      this.amenties_selected = filtered_items;
    } else {
      this.amenties_selected.push(value);
    }
    this.rent_form
      .get('facilities')
      ?.get('amenties')
      ?.setValue(this.amenties_selected);
  }
}
