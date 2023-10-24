import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { hash } from 'bcryptjs'

describe('Authenticate Controller (E2E)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    jwtService = moduleRef.get(JwtService)
    prismaService = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prismaService.user.create({
      data: {
        email: 'fulano@contato.com',
        password: await hash('senhaforte123', 8),
        name: 'fulano',
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'fulano@contato.com',
      password: 'senhaforte123',
    })

    expect(response.statusCode).toBe(201)
  })
})
