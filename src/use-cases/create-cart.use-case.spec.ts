import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserPayload } from '../types/user-payload'
import { CreateCartUseCase } from './create-cart.use-case'
import { InMemoryCartsRepository } from '../../test/repositories/in-memory-carts-repository'
import { NotFoundException } from '@nestjs/common'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryCartsRepository: InMemoryCartsRepository
let sut: CreateCartUseCase

describe('Change User Password', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryCartsRepository = new InMemoryCartsRepository()
    sut = new CreateCartUseCase(
      inMemoryCartsRepository,
      inMemoryUsersRepository,
    )
  })

  it("should be able to create user's cart", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const userPayload: UserPayload = {
      sub: user.id,
    }

    await sut.execute(userPayload)

    const carts = await inMemoryCartsRepository.findManyByUserId(user.id, {
      page: 1,
    })

    expect(carts).toHaveLength(1)
    expect(carts[0].id).toBeTruthy()
  })

  it("should not be able to create user's cart with wrong user id", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const userPayload: UserPayload = {
      sub: 'fake-id',
    }

    await expect(() => sut.execute(userPayload)).rejects.toBeInstanceOf(
      NotFoundException,
    )

    const carts = await inMemoryCartsRepository.findManyByUserId(user.id, {
      page: 1,
    })

    expect(carts).toHaveLength(0)
  })
})
