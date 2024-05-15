import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { EditDepartmentUseCase } from '../edit-department'

export function makeEditDepartmentUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const editDepartmentUseCase = new EditDepartmentUseCase(departmentsRepository)

  return editDepartmentUseCase
}
