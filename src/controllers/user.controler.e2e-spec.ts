import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../services/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'

describe('User Controller (E2E)', () => {
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

    const accessToken = jwtService.sign({ sub: user.id })

    await request(app.getHttpServer())
      .patch(`/user`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
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

  test('[PATCH] /user/password', async () => {
    const user = await prismaService.user.findUniqueOrThrow({
      where: {
        email: 'novo_email_fulano@contato.com',
      },
    })

    const accessToken = jwtService.sign({ sub: user.id })

    await request(app.getHttpServer())
      .patch(`/user/password`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password: 'senhaforte123',
        new_password: 'nova_senha123',
      })

    const updatedUser = await prismaService.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    })

    const changedPassword = await compare('nova_senha123', updatedUser.password)

    expect(changedPassword).toBe(true)
  })

  test('DELETE /user', async () => {
    const userToDelete = await prismaService.user.create({
      data: {
        email: 'user_to_delete@email.com',
        name: 'user to delete',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwtService.sign({ sub: userToDelete.id })

    await request(app.getHttpServer())
      .delete(`/user`)
      .set('Authorization', `Bearer ${accessToken}`)

    const user = await prismaService.user.findUnique({
      where: {
        email: 'user_to_delete@email.com',
      },
    })

    expect(user).toBe(null)
  })
})
