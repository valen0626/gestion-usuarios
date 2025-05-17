import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsInfoComponent } from '../shared/components/cards-info/cards-info.component';
import { UserListComponent } from '../shared/components/user-list/user-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    CardsInfoComponent, 
    UserListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
