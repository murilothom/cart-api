import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserPayload } from '../types/user-payload'
import { InMemoryCartsRepository } from '../../test/repositories/in-memory-carts-repository'
import { FetchCartsUseCase } from './fetch-carts.use-case'
import { NotFoundException } from '@nestjs/common'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryCartsRepository: InMemoryCartsRepository
let sut: FetchCartsUseCase

describe('Fetch Carts', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryCartsRepository = new InMemoryCartsRepository()
    sut = new FetchCartsUseCase(
      inMemoryCartsRepository,
      inMemoryUsersRepository,
    )
  })

  it("should be able to fetch user's cart by page", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    for (let i = 0; i < 21; i++) {
      await inMemoryCartsRepository.create(user.id)
    }

    const userPayload: UserPayload = {
      sub: user.id,
    }

    const { carts: cartsFirstPage } = await sut.execute(
      { page: 1 },
      userPayload,
    )

    const { carts: cartsSecondPage } = await sut.execute(
      { page: 2 },
      userPayload,
    )

    expect(cartsFirstPage).toHaveLength(20)
    expect(cartsSecondPage).toHaveLength(1)
  })

  it("should not be able to fetch user's cart by page with wrong user id", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    for (let i = 0; i < 21; i++) {
      await inMemoryCartsRepository.create(user.id)
    }

    const userPayload: UserPayload = {
      sub: 'fake-id',
    }

    await expect(() =>
      sut.execute({ page: 1 }, userPayload),
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
