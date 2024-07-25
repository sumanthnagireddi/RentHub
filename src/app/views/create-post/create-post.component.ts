import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatStepper, MatStepperModule, StepperOrientation, } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { RentalService } from '../../services/rental.service';
import { v4 as uuidv4 } from 'uuid';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { PreviewComponent } from "./preview/preview.component";
import { AMENITIES } from '../../shared/const';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, CommonModule, PreviewComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  rent_form!: FormGroup;
  amenities_included: string[] = AMENITIES
  selectedIndex: number = 0
  stepperOrientation!: Observable<StepperOrientation>;
  isBasicDetailsSubmitted: boolean = false;
  isRentDetailsSubmitted: boolean = false;
  isFacilitiesSubmitted: boolean = false
  isFormSubmitted: boolean = false
  amenities_selected: string[] = [];
  constructor(private _formBuilder: FormBuilder, private rentalService: RentalService, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  @ViewChild('stepper') stepper!: MatStepper;

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
        furnished: ['', Validators.required],
        amenities: [''],
      }),
    });
  }
  uploadImages(event: any) {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.rent_form.get('unitInformation')?.get('unit_images')?.setValue([...this.rent_form?.value?.unitInformation?.unit_images, event.target?.result,]);
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
        this.selectedIndex = 1
      } else {
        this.isBasicDetailsSubmitted = true;
        this.selectedIndex = 0
      }
    } else if (tab == 'rent') {
      if (this.rent_form.get('rentInformation')?.valid) {
        this.selectedIndex = 2;
      } else {
        this.isRentDetailsSubmitted = true;
        this.selectedIndex = 1
      }
    } else if (tab == 'facilities') {
      if (this.rent_form.get('facilities')?.valid) {
        this.selectedIndex = 3;
      } else {
        this.isFacilitiesSubmitted = true;
        this.selectedIndex = 2
      }
    } else {
      if (!this.rent_form.valid) {
        this.rentalService.addToPostedHome({
          id: uuidv4(),
          ...this.rent_form.value,
          author: 'me',
          ratings: []
        });
        this.isFormSubmitted = true
        alert("Your property published succesfully"),
          this.rent_form.reset();
        this.selectedIndex = 0

      } else {
        alert('Please fill all the fields')
        this.isBasicDetailsSubmitted = true;
        this.isFacilitiesSubmitted = true;
        this.isRentDetailsSubmitted = true;
      }

    }
  }
  handleAmenities(value: string) {
    if (this.amenities_selected && this.amenities_selected.includes(value)) {
      let filtered_items = this.amenities_selected.filter((am) => am != value);
      this.amenities_selected = filtered_items;
    } else {
      this.amenities_selected.push(value);
    }
    console.log(this.amenities_selected);

    this.rent_form.get('facilities')?.get('amenities')?.setValue(this.amenities_selected);
  }
  isControlInvalid(validator: string, formgroupName: string, controlName: string) {
    const control: any = this.rent_form.get(formgroupName)?.get(controlName);
    return (
      (validator == 'isBasicDetailsSubmitted' ? this.isBasicDetailsSubmitted : validator == 'isRentDetailsSubmitted' ? this.isRentDetailsSubmitted : this.isFacilitiesSubmitted &&
        !this.rent_form.value[formgroupName][controlName]) ||
      (control.touched && !this.rent_form.value[formgroupName][controlName])
    );
  }

}
