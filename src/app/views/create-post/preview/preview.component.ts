import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApartmentCardComponent } from "../../../components/apartment-card/apartment-card.component";

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [JsonPipe, ApartmentCardComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  @Input('current_data') current_data: any;
  @Output('submitEvent') submitEvent = new EventEmitter<any>()
  @Output('editEvent') editEvent = new EventEmitter<any>()
}
