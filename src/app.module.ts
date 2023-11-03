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
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case'
import { ChangeUserPasswordUseCase } from './use-cases/change-user-password.use-case'
import { DeleteUserUseCase } from './use-cases/delete-user.use-case'
import { PrismaCartsRepository } from './repositories/prisma/prisma-carts-repository'
import { CreateCartUseCase } from './use-cases/create-cart.use-case'
import { CartsController } from './controllers/carts.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [UserController, AuthenticateController, CartsController],
  providers: [
    PrismaService,
    PrismaUsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: PrismaUsersRepository,
    },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AuthenticateUserUseCase,
    ChangeUserPasswordUseCase,
    PrismaCartsRepository,
    {
      provide: 'ICartsRepository',
      useExisting: PrismaCartsRepository,
    },
    CreateCartUseCase,
  ],
})
export class AppModule {}
