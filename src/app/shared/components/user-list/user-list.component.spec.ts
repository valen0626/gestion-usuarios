import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('debería mostrar la lista de usuarios correctamente', () => {
  component.usuarios = [
    { id: 1, nombre: 'Valentina', email: 'valen@example.com', ciudad: 'Medellín', creacion: '2024-06-26', estado: 'Activo' },
    { id: 2, nombre: 'Carlos', email: 'carlos@example.com', ciudad: 'Bogotá', creacion: '2025-04-26', estado: 'Inactivo' },
  ];
  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;
  const nombres = compiled.querySelectorAll('.usuario');
  expect(nombres.length).toBe(2);
  expect(nombres[0].textContent).toContain('Valentina');
  expect(nombres[1].textContent).toContain('Carlos');
});

  it('debería emitir el id cuando se llama a eliminar()', () => {
    spyOn(component.eliminarUsuario, 'emit');

    const userId = 123;
    component.eliminar(userId);

    expect(component.eliminarUsuario.emit).toHaveBeenCalledWith(userId);
  });
});
