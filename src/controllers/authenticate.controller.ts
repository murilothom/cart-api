import {
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { PrismaService } from '../services/prisma.service'
import { compare } from 'bcryptjs'

@Controller('auth')
export class AuthenticateController {
  @Inject(JwtService)
  private readonly jwtService: JwtService

  @Inject(PrismaService)
  private readonly prismaService: PrismaService

  @Post('login')
  // FIXME: Arrumar
  async login(@Body() body: AuthenticateUserDto) {
    const { email, password } = body

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const accessToken = this.jwtService.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
