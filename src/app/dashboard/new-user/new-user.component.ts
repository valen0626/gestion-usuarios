import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  modoEdicion = false;
  idUsuario?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UserService,
  ) {
    this.newUserForm = this.fb.group({
      nombre: [''],
      email: [''],
      ciudad: [''],
      estado: ['Activo'],
      creacion: [new Date().toISOString().split('T')[0]] 
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idUsuario = +idParam;

      const usuario = this.usuariosService.getUsuariosActuales()
        .find(u => u.id === this.idUsuario);

      if (usuario) {
        this.newUserForm.patchValue(usuario);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit(): void {
    if (this.newUserForm.valid) {
      const datos = this.newUserForm.value;

      if (this.modoEdicion) {
        datos.id = this.idUsuario;
        this.usuariosService.editarUsuario(datos);
      } else {
        this.usuariosService.agregarUsuario(datos);
      }

      this.router.navigate(['/dashboard']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']);
  }

}

