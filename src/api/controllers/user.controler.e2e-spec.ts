import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { AppModule } from '../../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create User (E2E)', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prismaService = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      name: 'Fulano',
      email: 'fulano@contato.com',
      password: 'senhaforte123',
    })

    expect(response.statusCode).toBe(201)

    const user = await prismaService.user.findUniqueOrThrow({
      where: {
        email: 'fulano@contato.coma',
      },
    })

    expect(user.id).toBeTruthy()
  })
})
