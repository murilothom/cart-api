import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/users-repository'
import { ChangeUserPasswordDto } from '../types/dto/change-user-password.dto'
import { UserPayload } from '../types/user-payload'

@Injectable()
export class ChangeUserPasswordUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    dto: ChangeUserPasswordDto,
    currentUser: UserPayload,
  ): Promise<void> {
    const userId = currentUser.sub

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(dto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    user.password = await hash(dto.new_password, 8)
    await this.usersRepository.update(user)
  }
}
