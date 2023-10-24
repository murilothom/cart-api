import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/users-repository'
import { UserViewModel, mapToUserViewModel } from '../types/user-view-model'
import { CreateUserDto } from '../types/dto/create-user.dto'

interface CreateUserUseCaseResponse {
  user: UserViewModel
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserDto): Promise<CreateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new ConflictException('User already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const data: CreateUserDto = {
      email,
      name,
      password: hashedPassword,
    }
    const user = await this.usersRepository
      .create(data)
      .then(mapToUserViewModel)

    return {
      user,
    }
  }
}
