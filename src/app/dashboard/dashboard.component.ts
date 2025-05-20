import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsInfoComponent } from '../shared/components/cards-info/cards-info.component';
import { UserListComponent } from '../shared/components/user-list/user-list.component';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../shared/components/nav/nav.component';
import { NewUserComponent } from './new-user/new-user.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardsInfoComponent,
    UserListComponent,
    FormsModule,
    NavComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  correo: any;
  cantidadUsuarios: number = 0;
  filtroEstado: string = '';
  filtroCiudad: string = '';
  fechaInicio: Date = new Date;
  fechaFin: Date = new Date;
  mostrarFiltros: boolean = false;
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  usuariosPaginados: any[] = [];
  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  verFormularioUsuario: Boolean = false;
  usuarioAEditar: any 

  constructor(private userService: UserService) {
    this.correo = localStorage.getItem('correo')
  }

  ngOnInit(): void {
    this.userService.usuarios$.subscribe(data => {
      this.usuarios = data;
      this.cantidadUsuarios = data.length;
      this.aplicarFiltros();
    });
  }

  agregarUsuario(datos: any) {
    this.cantidadUsuarios = this.userService.agregarUsuario(datos);
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.usuariosFiltrados = this.userService.filtrarUsuarios(
      this.filtroCiudad,
      this.filtroEstado
    );
    this.paginaActual = 1;
    this.cantidadUsuarios = this.usuariosFiltrados.length;
    this.actualizarPagina();
  }

  editarUsuario(data: any) {
    this.verFormularioUsuario=true
    this.userService.editarUsuario(data)
    this.aplicarFiltros()
  }

  eliminar(id: number) {
    this.userService.eliminarUsuario(id);
    this.aplicarFiltros();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
  }

  siguientePagina() {
    if ((this.paginaActual * this.elementosPorPagina) < this.usuariosFiltrados.length) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.elementosPorPagina);
  }
}
