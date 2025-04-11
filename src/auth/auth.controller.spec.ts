import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from '../database/models/usuario.model';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    register: jest.Mock;
    login: jest.Mock;
    validateUser: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      register: jest.fn().mockResolvedValue({ token: 'mock-token' }),
      login: jest.fn().mockResolvedValue({ token: 'mock-token' }),
      validateUser: jest.fn().mockResolvedValue({
        id: '123',
        nombre: 'Juan',
        email: 'juan@correo.com',
        createdAt: new Date(),
      } as Usuario),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería registrar y retornar un token', async () => {
    const result = await controller.register({
      nombre: 'Juan',
      email: 'juan@correo.com',
      password: '123456',
    });

    expect(result).toEqual({ token: 'mock-token' });
    expect(authService.register).toHaveBeenCalled();
  });

  it('debería hacer login y retornar un token', async () => {
    const result = await controller.login({
      email: 'juan@correo.com',
      password: '123456',
    });

    expect(result).toEqual({ token: 'mock-token' });
    expect(authService.login).toHaveBeenCalled();
  });

  it('debería retornar los datos del usuario actual', async () => {
    const user = await authService.validateUser('123');
    const perfil = controller.getPerfil(user);
    expect(perfil).toHaveProperty('email', 'juan@correo.com');
  });
});
