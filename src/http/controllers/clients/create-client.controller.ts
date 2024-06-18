import { makeCreateClientUseCase } from '@/use-cases/clients/factories/make-create-client'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createClientBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
})

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = createClientBodySchema.parse(request.body)

    const createClientUseCase = makeCreateClientUseCase()

    const result = await createClientUseCase.execute({
      name,
      cpf,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          return response.status(409).json({
            message: error.message,
          })
        default:
          return response.status(400).json({
            message: error.message,
          })
      }
    }

    return response.status(201).send()
  }
}
