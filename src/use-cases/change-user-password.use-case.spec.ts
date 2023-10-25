import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
// import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { compare, hash } from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common'
import { ChangeUserPasswordUseCase } from './change-user-password.use-case'
import { ChangeUserPasswordDto } from '../types/dto/change-user-password.dto'
import { UserPayload } from '../types/user-payload'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: ChangeUserPasswordUseCase

describe('Change User Password', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new ChangeUserPasswordUseCase(inMemoryUsersRepository)
  })

  it("should be able to change user's password", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const data: ChangeUserPasswordDto = {
      password: '123456',
      new_password: '1234567890',
    }

    const userPayload: UserPayload = {
      sub: user.id,
    }

    await sut.execute(data, userPayload)

    const userWithNewPassword = await inMemoryUsersRepository.findById(user.id)

    if (!userWithNewPassword) {
      return
    }

    const changedPassword = await compare(
      data.new_password,
      userWithNewPassword.password,
    )

    expect(changedPassword).toBe(true)
  })

  it("should not be able to change user's password using the wrong password", async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const data: ChangeUserPasswordDto = {
      password: 'fake_pass',
      new_password: '1234567890',
    }

    const userPayload: UserPayload = {
      sub: user.id,
    }

    await expect(() => sut.execute(data, userPayload)).rejects.toBeInstanceOf(
      UnauthorizedException,
    )
  })
})
