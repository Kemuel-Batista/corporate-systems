import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { makeEditClientUseCase } from '@/use-cases/clients/factories/make-edit-client'
import { Request, Response } from 'express'
import { z } from 'zod'

const editClientBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
})

export class EditClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, cpf } = editClientBodySchema.parse(request.body)

    const editClientUseCase = makeEditClientUseCase()

    const result = await editClientUseCase.execute({
      id,
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

    return response.status(204).send()
  }
}
