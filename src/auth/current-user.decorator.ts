import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserPayload } from '../types/user-payload'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest()

    return request.user
  },
)
