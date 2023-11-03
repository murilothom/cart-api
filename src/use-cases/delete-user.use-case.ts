import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IUsersRepository } from '../repositories/users-repository'
import { UserPayload } from '../types/user-payload'

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(currentUser: UserPayload): Promise<void> {
    const userId = currentUser.sub

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    await this.usersRepository.deleteById(user.id)
  }
}
