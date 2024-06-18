import { makeListDepartmentsUseCase } from '@/use-cases/departments/factories/make-list-departments'
import { Request, Response } from 'express'

export class ListDepartmentController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listDepartmentUseCase = makeListDepartmentsUseCase()

    const result = await listDepartmentUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os departamentos')
    }

    const departments = result.value.departments

    return response.status(200).json({
      departments,
    })
  }
}
