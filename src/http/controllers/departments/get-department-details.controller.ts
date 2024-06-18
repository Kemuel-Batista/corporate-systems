import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetDepartmentDetailsUseCase } from '@/use-cases/departments/factories/make-get-department-details'
import { Request, Response } from 'express'

export class GetDepartmentDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getDepartmentDetailsUseCase = makeGetDepartmentDetailsUseCase()

    const result = await getDepartmentDetailsUseCase.execute({
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

    const department = result.value.department

    return response.status(200).send(department)
  }
}
