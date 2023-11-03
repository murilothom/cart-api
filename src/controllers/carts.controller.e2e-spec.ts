import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { PrismaService } from '../services/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Carts Controller (E2E)', () => {
  let app: INestApplication
  let prismaService: PrismaService
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prismaService = moduleRef.get(PrismaService)
    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /carts', async () => {
    const user = await prismaService.user.create({
      data: {
        email: 'fulano@contato.com',
        password: await hash('senhaforte123', 8),
        name: 'fulano',
      },
    })

    const accessToken = jwtService.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/carts')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(201)
  })
})
