import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../database/models/usuario.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: {
    nombre: string;
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const hash = await bcrypt.hash(data.password, 10);

    const usuario = await this.usuarioModel.create({
      nombre: data.nombre,
      email: data.email,
      password_hash: hash,
    } as Usuario);

    return { token: this.jwtService.sign({ sub: usuario.id }) };
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const usuario = await this.usuarioModel.findOne({
      where: { email: data.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isMatch = await bcrypt.compare(data.password, usuario.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return { token: this.jwtService.sign({ sub: usuario.id }) };
  }

  async validateUser(userId: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByPk(userId);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no válido');
    }

    return usuario;
  }
}
