import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { makeEditSupplierUseCase } from '@/use-cases/suppliers/factories/make-edit-supplier'
import { Request, Response } from 'express'
import { z } from 'zod'

const editSupplierBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.number().int().positive().min(0).max(1),
})

export class EditSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, description, status } = editSupplierBodySchema.parse(
      request.body,
    )

    const editSupplierUseCase = makeEditSupplierUseCase()

    const result = await editSupplierUseCase.execute({
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
