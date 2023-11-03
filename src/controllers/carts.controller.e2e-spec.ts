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

  test('[POST] /cart', async () => {
    const user = await prismaService.user.create({
      data: {
        email: 'fulano@contato.com',
        password: await hash('senhaforte123', 8),
        name: 'fulano',
      },
    })

    const accessToken = jwtService.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', `Bearer ${accessToken}`)

    const carts = await prismaService.cart.findMany({
      where: {
        userId: user.id,
      },
    })

    expect(carts).toHaveLength(1)
    expect(response.statusCode).toBe(201)
  })

  test('[GET] /cart/list', async () => {
    const user = await prismaService.user.findUniqueOrThrow({
      where: {
        email: 'fulano@contato.com',
      },
    })

    const accessToken = jwtService.sign({ sub: user.id })

    for (let i = 0; i < 20; i++) {
      await prismaService.cart.create({
        data: {
          userId: user.id,
        },
      })
    }

    const responseFirstPage = await request(app.getHttpServer())
      .get('/cart/list')
      .query({ page: 1 })
      .set('Authorization', `Bearer ${accessToken}`)

    const responseSecondPage = await request(app.getHttpServer())
      .get('/cart/list')
      .query({ page: 2 })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(responseFirstPage.statusCode).toBe(200)
    expect(responseSecondPage.statusCode).toBe(200)
    expect(responseFirstPage.body.carts).toHaveLength(20)
    expect(responseSecondPage.body.carts).toHaveLength(1)
  })
})
