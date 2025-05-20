import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() usuarios: any[] = [];
  @Output() eliminarUsuario = new EventEmitter<number>();

  mostrarFiltros: boolean = false;

  constructor() {
    console.log(this.usuarios)
  }

  eliminar(id: number) {
    this.eliminarUsuario.emit(id);
  }

}
