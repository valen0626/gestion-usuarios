import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  imports: [CommonModule],
  templateUrl: './cards-info.component.html',
  styleUrl: './cards-info.component.css'
})
export class CardsInfoComponent {
  @Input() titulo!: String
  @Input() cantidad!: Number
  @Input() indicador!: String;
  @Input() porcentaje!: String;

  constructor( ){
    
  }
}
