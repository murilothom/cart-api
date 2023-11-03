import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserPayload } from '../types/user-payload'
import { ICartsRepository } from '../repositories/carts-repository'
import { IUsersRepository } from '../repositories/users-repository'

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject('ICartsRepository')
    private cartsRepository: ICartsRepository,
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(currentUser: UserPayload): Promise<void> {
    const userId = currentUser.sub
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found.')
    }

    await this.cartsRepository.create(userId)
  }
}
