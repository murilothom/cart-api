import { hash } from 'bcryptjs'
import { NotFoundException } from '@nestjs/common'
import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
import { UserPayload } from '../types/user-payload'
import { DeleteUserUseCase } from './delete-user.use-case'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete an user', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const currentUser: UserPayload = {
      sub: user.id,
    }

    await sut.execute(currentUser)

    const updatedUser = await inMemoryUsersRepository.findById(user.id)

    expect(updatedUser).toBe(null)
  })

  it('should not be able to delete an user with wrong id', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      name: 'testing name',
      password: await hash('123456', 8),
    })

    const currentUser: UserPayload = {
      sub: 'fake-id',
    }

    await expect(() => sut.execute(currentUser)).rejects.toBeInstanceOf(
      NotFoundException,
    )
  })
})
