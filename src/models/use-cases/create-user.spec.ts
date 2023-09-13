import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository'
import { CreateUserDto } from '../types/dto/CreateUserDto'
import { CreateUserUseCase } from './create-user'

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
})
