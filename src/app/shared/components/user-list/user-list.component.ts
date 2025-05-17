import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  usuarios: any[] = []

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.userService.getUsuarios().subscribe({
      next: (data) => {
        console.log(data)
        this.usuarios = data
      },
      error: (err)=>{
        console.error('Error al cargar usuarios', err)
      }
    })
    
  }
}
