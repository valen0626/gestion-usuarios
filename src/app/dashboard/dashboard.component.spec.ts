import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';

// Mock components usados en el template
import { CardsInfoComponent } from '../shared/components/cards-info/cards-info.component';
import { UserListComponent } from '../shared/components/user-list/user-list.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUserService: any;

  const mockUsuarios = [
    { id: 1, nombre: 'Juan', email: 'juan@mail.com', ciudad: 'Medellín', estado: 'Activo', creacion: '2025-05-19' },
    { id: 2, nombre: 'Ana', email: 'ana@mail.com', ciudad: 'Bogotá', estado: 'Inactivo', creacion: '2025-05-18' }
  ];

  beforeEach(async () => {
    const usuariosSubject = new BehaviorSubject<any[]>(mockUsuarios);

    mockUserService = {
      usuarios$: usuariosSubject.asObservable(), 
      filtrarUsuarios: jasmine.createSpy('filtrarUsuarios').and.callFake(() => mockUsuarios),
      eliminarUsuario: jasmine.createSpy('eliminarUsuario').and.callFake(() => {
        mockUsuarios.pop();
        usuariosSubject.next(mockUsuarios); 
      }),
      agregarUsuario: jasmine.createSpy('agregarUsuario').and.returnValue(mockUsuarios.length),
      editarUsuario: jasmine.createSpy('editarUsuario')
    };

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        CardsInfoComponent,
        UserListComponent,
        NavComponent,
        RouterTestingModule,
        FormsModule,
        CommonModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios al inicializar', () => {
    expect(component.usuarios.length).toBe(2);
    expect(component.cantidadUsuarios).toBe(2);
  });

  it('debería eliminar un usuario', () => {
    component.eliminar(1);
    expect(mockUserService.eliminarUsuario).toHaveBeenCalledWith(1);
    expect(component.usuarios.length).toBeLessThan(2); 
  });
});
