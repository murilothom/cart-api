import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserController } from './api/controllers/user.controller'
import { PrismaUsersRepository } from './models/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from './models/use-cases/create-user.use-case'
import { UpdateUserUseCase } from './models/use-cases/update-user.use-case'

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: PrismaUsersRepository,
    },
    CreateUserUseCase,
    UpdateUserUseCase,
  ],
})
export class AppModule {}
