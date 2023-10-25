import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { TokenPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext): TokenPayload => {
    const request = context.switchToHttp().getRequest()

    return request.user
  },
)
