import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteClientUseCase } from '@/use-cases/clients/factories/make-delete-client'
import { Request, Response } from 'express'

export class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteClientUseCase = makeDeleteClientUseCase()

    const result = await deleteClientUseCase.execute({
      id,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return response.status(404).json({
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
