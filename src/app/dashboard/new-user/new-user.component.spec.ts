import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewUserComponent } from './new-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserService } from '../../services/user.service'; 
import { of } from 'rxjs';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let mockUserService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockUserService = {
      agregarUsuario: jasmine.createSpy('agregarUsuario'),
      editarUsuario: jasmine.createSpy('editarUsuario'),
      getUsuariosActuales: jasmine.createSpy('getUsuariosActuales').and.returnValue([
        { id: 1, nombre: 'Juan', email: 'juan@mail.com', ciudad: 'Medellín', estado: 'Activo', creacion: '2025-05-19' }
      ])
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.callFake((key: string) => null) // valor por defecto
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [NewUserComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService } 
      ]
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('debería tener el formulario inválido si está vacío', () => {
    createComponent();
    expect(component.newUserForm.valid).toBeFalse();
  });

  it('debería llamar a agregarUsuario al enviar el formulario en modo agregar', () => {
    createComponent();

    component.newUserForm.setValue({
      nombre: 'Valentina',
      email: 'vale@mail.com',
      ciudad: 'Bogotá',
      estado: 'Activo',
      creacion: '2025-05-19'
    });

    component.onSubmit();

    expect(mockUserService.agregarUsuario).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Valentina'
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('debería cargar datos en modo edición si hay id en la ruta', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.callFake((key: string) => {
      if (key === 'id') return '1';
      return null;
    });

    createComponent();

    expect(component.modoEdicion).toBeTrue();
    expect(component.newUserForm.value.nombre).toBe('Juan');
  });

  it('debería llamar a editarUsuario al enviar el formulario en modo edición', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.callFake((key: string) => {
      if (key === 'id') return '1';
      return null;
    });

    createComponent();

    component.newUserForm.setValue({
      nombre: 'Juan Actualizado',
      email: 'juan@mail.com',
      ciudad: 'Medellín',
      estado: 'Activo',
      creacion: '2025-05-19'
    });

    component.onSubmit();

    expect(mockUserService.editarUsuario).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      nombre: 'Juan Actualizado'
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('debería navegar al dashboard si se cancela', () => {
    createComponent();
    component.cancelar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
