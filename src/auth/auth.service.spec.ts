import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/sequelize';
import { Usuario } from '../database/models/usuario.model';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usuarioModel: { findOne: jest.Mock; create: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    usuarioModel = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('test-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: getModelToken(Usuario), useValue: usuarioModel },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('debería registrar un usuario y retornar un token', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');
    usuarioModel.create.mockResolvedValue({ id: '123' });

    const result = await service.register({
      nombre: 'Juan',
      email: 'juan@correo.com',
      password: 'secreto123',
    });

    expect(result).toEqual({ token: 'test-token' });
    expect(usuarioModel.create).toHaveBeenCalledWith({
      nombre: 'Juan',
      email: 'juan@correo.com',
      password_hash: 'hashed-pass',
    });
  });

  it('debería lanzar error si el usuario no existe al hacer login', async () => {
    usuarioModel.findOne.mockResolvedValue(null);

    await expect(
      service.login({ email: 'no@existe.com', password: 'fail' }),
    ).rejects.toThrow('Credenciales incorrectas');
  });

  it('debería lanzar error si la contraseña no coincide', async () => {
    usuarioModel.findOne.mockResolvedValue({ password_hash: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ email: 'existe@correo.com', password: 'wrong' }),
    ).rejects.toThrow('Credenciales incorrectas');
  });

  it('debería retornar un token al hacer login con datos correctos', async () => {
    usuarioModel.findOne.mockResolvedValue({
      id: '123',
      password_hash: 'hash',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({
      email: 'existe@correo.com',
      password: 'correcta',
    });

    expect(result).toEqual({ token: 'test-token' });
  });
});
