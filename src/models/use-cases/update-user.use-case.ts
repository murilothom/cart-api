import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { IUsersRepository } from '../repositories/users-repository'
import { UpdateUserDto } from '../types/dto/update-user.dto'

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, { email, name }: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException('E-mail in use.')
      }
    }

    user.email = email ?? user.email
    user.name = name ?? user.name
    user.updatedAt = new Date()

    await this.usersRepository.update(user)
  }
}
