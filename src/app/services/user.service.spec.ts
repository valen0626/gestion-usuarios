import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const mockUsuarios: any[] = [
    { id: 1, nombre: 'Juan', email: 'juan@example.com', rol: 'admin', estado: 'activo', ciudad: 'Medellín' },
    { id: 2, nombre: 'Ana', email: 'ana@example.com', rol: 'user', estado: 'inactivo', ciudad: 'Bogotá' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('debería cargar los usuarios desde users.json', fakeAsync(() => {
    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsuarios);

    tick();
    expect(service.getUsuariosActuales().length).toBe(2);
  }));

  it('debería agregar un usuario', fakeAsync(() => {
    httpMock.expectOne('assets/users.json').flush(mockUsuarios);
    tick();

    const nuevoUsuario = {
      nombre: 'Pedro',
      email: 'pedro@example.com',
      rol: 'user',
      estado: 'activo',
      ciudad: 'Cali'
    };

    const totalUsuarios = service.agregarUsuario(nuevoUsuario);
    expect(totalUsuarios).toBe(3);

    const usuarios = service.getUsuariosActuales();
    expect(usuarios.find(u => u.nombre === 'Pedro')).toBeTruthy();
  }));

  it('debería editar un usuario existente', fakeAsync(() => {
    httpMock.expectOne('assets/users.json').flush(mockUsuarios);
    tick();

    const usuarioActualizado = {
      id: 1,
      nombre: 'Juan Editado',
      email: 'juaneditado@example.com'
    };

    service.editarUsuario(usuarioActualizado);
    const usuario = service.getUsuariosActuales().find(u => u.id === 1);
    expect(usuario?.nombre).toBe('Juan Editado');
    expect(usuario?.email).toBe('juaneditado@example.com');
  }));

  it('debería eliminar un usuario por ID', fakeAsync(() => {
    httpMock.expectOne('assets/users.json').flush(mockUsuarios);
    tick();

    service.eliminarUsuario(1);
    const usuarios = service.getUsuariosActuales();
    expect(usuarios.length).toBe(1);
    expect(usuarios.find(u => u.id === 1)).toBeUndefined();
  }));

  it('debería filtrar por ciudad y estado', fakeAsync(() => {
    httpMock.expectOne('assets/users.json').flush(mockUsuarios);
    tick();

    const filtrados = service.filtrarUsuarios('Medellín', 'activo');
    expect(filtrados.length).toBe(1);
    expect(filtrados[0].nombre).toBe('Juan');
  }));

  it('debería retornar todos si no se pasa ningún filtro', fakeAsync(() => {
    httpMock.expectOne('assets/users.json').flush(mockUsuarios);
    tick();

    const todos = service.filtrarUsuarios('', '');
    expect(todos.length).toBe(2);
  }));
});
