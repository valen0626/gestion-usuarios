import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

class UserServiceMock {
  usuarios$ = of([
    { id: 1, nombre: 'Valentina', email: 'valen@example.com', estado: 'Activo' },
    { id: 2, nombre: 'Carlos', email: 'carlos@example.com', estado: 'Inactivo' },
  ]);

  agregarUsuario(datos: any) {
    return 2; 
  }

  filtrarUsuarios(ciudad: string, estado: string) {
    return [
      { id: 1, nombre: 'Valentina', email: 'valen@example.com', estado: 'Activo' },
      { id: 2, nombre: 'Carlos', email: 'carlos@example.com', estado: 'Inactivo' },
    ];
  }

  editarUsuario(data: any) {
    // mock vacío
  }

  eliminarUsuario(id: number) {
    // mock vacío
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userServiceMock: UserServiceMock;

  beforeEach(async () => {
    userServiceMock = new UserServiceMock();

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, CommonModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios al inicializar', fakeAsync(() => {
    fixture.detectChanges();
    tick(); 

    expect(component.usuarios.length).toBe(2);
    expect(component.cantidadUsuarios).toBe(2);
  }));

  it('debería eliminar un usuario', fakeAsync(() => {
    spyOn(userServiceMock, 'eliminarUsuario').and.callThrough();

    fixture.detectChanges();
    tick();

    component.eliminar(1);

    expect(userServiceMock.eliminarUsuario).toHaveBeenCalledWith(1);
  }));

  it('debería aplicar filtros y paginar', () => {
    spyOn(userServiceMock, 'filtrarUsuarios').and.callThrough();

    component.filtroCiudad = '';
    component.filtroEstado = '';

    component.aplicarFiltros();

    expect(userServiceMock.filtrarUsuarios).toHaveBeenCalledWith('', '');
    expect(component.usuariosPaginados.length).toBeLessThanOrEqual(component.elementosPorPagina);
  });
});
