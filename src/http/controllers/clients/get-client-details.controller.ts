import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetClientDetailsUseCase } from '@/use-cases/clients/factories/make-get-client-details'
import { Request, Response } from 'express'

export class GetClientDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getClientDetailsUseCase = makeGetClientDetailsUseCase()

    const result = await getClientDetailsUseCase.execute({
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

    const client = result.value.client

    return response.status(200).send(client)
  }
}
