import { hash } from 'bcryptjs'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { UpdateUserUseCase } from './update-user.use-case'
import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
import { UpdateUserDto } from '../types/dto/update-user.dto'
import { UserPayload } from '../types/user-payload'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to update an user', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const data: UpdateUserDto = {
      email: 'new_test@email.com',
      name: 'new testing name',
    }

    const currentUser: UserPayload = {
      sub: user.id,
    }

    await sut.execute(data, currentUser)

    const updatedUser = await inMemoryUsersRepository.findById(user.id)

    expect(updatedUser?.email).toBe('new_test@email.com')
    expect(updatedUser?.name).toBe('new testing name')
  })

  it('should not be able to update a non-existent user', async () => {
    const data: UpdateUserDto = {
      email: 'test@email.com',
    }

    await expect(() =>
      sut.execute(data, { sub: 'fake-id' }),
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should not be able to update an user with an existent email', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const user = await inMemoryUsersRepository.create({
      email: 'test2@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const data: UpdateUserDto = {
      email: 'test@email.com',
    }

    const currentUser: UserPayload = {
      sub: user.id,
    }

    await expect(() => sut.execute(data, currentUser)).rejects.toBeInstanceOf(
      ConflictException,
    )
  })
})
