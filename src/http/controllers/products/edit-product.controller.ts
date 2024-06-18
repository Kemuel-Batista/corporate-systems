import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { makeEditProductUseCase } from '@/use-cases/products/factories/make-edit-product'
import { Request, Response } from 'express'
import { z } from 'zod'

const editProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.number().int().positive().min(0).max(1),
})

export class EditProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, description, status } = editProductBodySchema.parse(
      request.body,
    )

    const editProductUseCase = makeEditProductUseCase()

    const result = await editProductUseCase.execute({
      id,
      name,
      description,
      status,
      updatedBy: request.user.sub,
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
