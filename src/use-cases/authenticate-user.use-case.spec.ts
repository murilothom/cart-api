import { InMemoryUsersRepository } from '../../test/repositories/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate-user.use-case'
import { JwtService } from '@nestjs/jwt'
import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { hash } from 'bcryptjs'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { INestApplication, UnauthorizedException } from '@nestjs/common'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  let app: INestApplication
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, jwtService)
  })

  it('should be able to authenticate an user', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const data: AuthenticateUserDto = {
      email: 'test@email.com',
      password: '123456',
    }

    const { access_token: accessToken } = await sut.execute(data)

    expect(accessToken).toBeTruthy()
  })

  it('should not be able to authenticate an user with incorrect password', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const data: AuthenticateUserDto = {
      email: 'test@email.com',
      password: '1234567',
    }

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      UnauthorizedException,
    )
  })

  it('should not be able to authenticate an user with incorrect email', async () => {
    await inMemoryUsersRepository.create({
      email: 'test@email.com',
      password: await hash('123456', 8),
      name: 'john doe',
    })

    const data: AuthenticateUserDto = {
      email: 'test_@email.com',
      password: '123456',
    }

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      UnauthorizedException,
    )
  })
})
