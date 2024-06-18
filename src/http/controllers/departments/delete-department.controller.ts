import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteDepartmentUseCase } from '@/use-cases/departments/factories/make-delete-department'
import { Request, Response } from 'express'

export class DeleteDepartmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteDepartmentUseCase = makeDeleteDepartmentUseCase()

    const result = await deleteDepartmentUseCase.execute({
      id,
      deletedBy: request.user.sub,
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
