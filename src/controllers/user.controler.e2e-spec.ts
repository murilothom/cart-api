import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../services/prisma.service'

describe('User Controller (E2E)', () => {
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
        email: 'fulano@contato.com',
      },
    })

    expect(user.id).toBeTruthy()
  })

  test('[PATCH] /user', async () => {
    const user = await prismaService.user.findUniqueOrThrow({
      where: {
        email: 'fulano@contato.com',
      },
    })

    await request(app.getHttpServer()).patch(`/user/${user.id}`).send({
      name: 'Novo nome',
      email: 'novo_email_fulano@contato.com',
    })

    const updatedUser = await prismaService.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    })

    expect(updatedUser.name).toBe('Novo nome')
    expect(updatedUser.email).toBe('novo_email_fulano@contato.com')
  })
})
