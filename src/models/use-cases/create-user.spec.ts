import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository'
import { CreateUserDto } from '../types/dto/CreateUserDto'
import { CreateUserUseCase } from './create-user'
import { ConflictException } from '@nestjs/common'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create an user', async () => {
    const data: CreateUserDto = {
      email: 'test@email.com',
      name: 'testing name',
      password: '123456',
    }

    const { user } = await sut.execute(data)

    expect(user.id).toBeTruthy()
    expect(user.email).toBe(user.email)
  })

  it('should not be able to create an user with an existent email', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const data: CreateUserDto = {
      email: 'test@email.com',
      name: 'testing name',
      password: '123456',
    }

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      ConflictException,
    )
  })
})
