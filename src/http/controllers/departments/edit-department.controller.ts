import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { makeEditDepartmentUseCase } from '@/use-cases/departments/factories/make-edit-department'
import { Request, Response } from 'express'
import { z } from 'zod'

const editDepartmentBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export class EditDepartmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, description } = editDepartmentBodySchema.parse(request.body)

    const editDepartmentUseCase = makeEditDepartmentUseCase()

    const result = await editDepartmentUseCase.execute({
      id,
      name,
      description,
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
