import { makeCreateDepartmentUseCase } from '@/use-cases/departments/factories/make-create-department'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createDepartmentBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export class CreateDepartmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = createDepartmentBodySchema.parse(request.body)

    const createDepartmentUseCase = makeCreateDepartmentUseCase()

    const result = await createDepartmentUseCase.execute({
      name,
      description,
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

    return response.status(201).json(result.value)
  }
}
