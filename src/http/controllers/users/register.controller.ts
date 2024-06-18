import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { makeRegisterUseCase } from '@/use-cases/users/factories/make-register-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  departmentId: z.string().uuid(),
})

export class RegisterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, departmentId } = registerBodySchema.parse(
      request.body,
    )

    try {
      const registerUseCase = makeRegisterUseCase()

      await registerUseCase.execute({ name, email, password, departmentId })

      return response.status(201).send()
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
