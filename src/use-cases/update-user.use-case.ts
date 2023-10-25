import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { IUsersRepository } from '../repositories/users-repository'
import { UpdateUserDto } from '../types/dto/update-user.dto'
import { TokenPayload } from '../types/token-payload'

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(dto: UpdateUserDto, currentUser: TokenPayload): Promise<void> {
    const { email, name } = dto
    const userId = currentUser.sub

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail && userWithSameEmail.id !== userId) {
        throw new ConflictException('E-mail in use.')
      }
    }

    user.email = email ?? user.email
    user.name = name ?? user.name
    user.updatedAt = new Date()

    await this.usersRepository.update(user)
  }
}
