import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(
      registerDto.name,
      registerDto.email,
      registerDto.password,
      registerDto.contact,
    );

    if (!user) {
      throw new UnauthorizedException('Failed to create user');
    }

    // Get the user ID - handle both document and plain object
    const userId = (user as any)._id || (user as any).id;
    
    // Convert ObjectId to string for JWT payload
    const payload = { 
      email: user.email, 
      sub: userId.toString() 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId.toString(),
        name: user.name,
        email: user.email,
        contact: user.contact || null,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Update last login
    await this.usersService.updateLastLogin(user._id.toString());

    // Convert ObjectId to string for JWT payload
    const payload = { email: user.email, sub: user._id.toString() };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    
    return null;
  }
}