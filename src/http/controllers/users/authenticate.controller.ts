import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/users/factories/make-authenticate-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { sign } from 'jsonwebtoken'
import { env } from '@/env'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUseCase = makeAuthenticateUseCase()

      const { user } = await authenticateUseCase.execute({ email, password })

      const token = sign({ id: user.id }, env.SECRET_JWT, {
        expiresIn: '2h',
      })

      return response.status(200).send({
        token,
      })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return response.status(400).send({
          message: err.message,
        })
      }

      throw err
    }
  }
}
