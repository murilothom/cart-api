import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { PrismaService } from '../services/prisma.service'

describe('Authenticate Controller (E2E)', () => {
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

  test('[POST] /auth/login', async () => {
    await prismaService.user.create({
      data: {
        email: 'fulano@contato.com',
        password: await hash('senhaforte123', 8),
        name: 'fulano',
      },
    })

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'fulano@contato.com',
        password: 'senhaforte123',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.access_token).toBeTruthy()
  })
})
