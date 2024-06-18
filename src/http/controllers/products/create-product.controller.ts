import { makeCreateProductUseCase } from '@/use-cases/products/factories/make-create-product'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.number().int().positive().min(0).max(1),
})

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, status } = createProductBodySchema.parse(
      request.body,
    )

    const createProductUseCase = makeCreateProductUseCase()

    const result = await createProductUseCase.execute({
      name,
      description,
      status,
      createdBy: request.user.sub,
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
