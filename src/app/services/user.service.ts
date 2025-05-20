import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number,
  nombre: string,
  email: string,
  rol: string,
  estado: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private usuariosSubject = new BehaviorSubject<any[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
  }


  private cargarUsuarios() {
    this.http.get<any[]>('assets/users.json').subscribe(data => {
      this.usuariosSubject.next(data);
    });
  }

   getUsuariosActuales(): any[] {
    return this.usuariosSubject.value;
  }

  agregarUsuario(usuario: any) {
    const usuarios = this.usuariosSubject.value;
    usuario.id = Date.now();
    this.usuariosSubject.next([...usuarios, usuario]);
    return this.usuariosSubject.value.length
  }

   editarUsuario(usuarioActualizado: any) {
    const usuarios = this.usuariosSubject.value.map(usuario => {
    if (usuario.id === usuarioActualizado.id) {
      return { ...usuario, ...usuarioActualizado }; // Actualiza solo los campos necesarios
    }
    return usuario;
  });

  this.usuariosSubject.next(usuarios);
  }

  eliminarUsuario(id: number) {
    const usuariosActuales = this.usuariosSubject.value;
    const nuevosUsuarios = usuariosActuales.filter(u => u.id !== id );
    this.usuariosSubject.next(nuevosUsuarios);
  }

  filtrarUsuarios(ciudad: string, estado: string): any[] {
    const usuarios = this.usuariosSubject.value;

    return usuarios.filter(usuario => {
      const coincideCiudad = ciudad ? usuario.ciudad === ciudad : true;
      const coincideEstado = estado ? usuario.estado === estado : true;
      return coincideCiudad && coincideEstado;
    });
  }


}
