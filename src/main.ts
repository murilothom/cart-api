import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cart API')
    .setDescription('API para criação de carrinhos de compras.')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(port)

  console.log('******************************')
  console.log(`        SERVER STARTED        `)
  console.log(`    Listening on port ${port} `)
  console.log('******************************')
}
bootstrap()
