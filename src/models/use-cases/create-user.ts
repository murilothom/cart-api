import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { CreateUserDto } from '../types/dto/CreateUserDto'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

interface CreateUserUseCaseResponse {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

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
    const user = await this.usersRepository.create(data)

    return {
      user: {
        ...user,
        password: undefined,
      },
    }
  }
}
