import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { PrismaService } from './services/prisma.service'
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { UpdateUserUseCase } from './use-cases/update-user.use-case'
import { AuthenticateUserUseCase } from './use-cases/authenticate-user'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [UserController, AuthenticateController],
  providers: [
    PrismaService,
    PrismaUsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: PrismaUsersRepository,
    },
    CreateUserUseCase,
    UpdateUserUseCase,
    AuthenticateUserUseCase,
  ],
})
export class AppModule {}
