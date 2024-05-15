import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { DeleteDepartmentUseCase } from '../delete-department'

export function makeDeleteDepartmentUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const deleteDepartmentUseCase = new DeleteDepartmentUseCase(
    departmentsRepository,
  )

  return deleteDepartmentUseCase
}
