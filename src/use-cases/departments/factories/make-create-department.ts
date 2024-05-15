import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { CreateDepartmentUseCase } from '../create-department'

export function makeCreateDepartmentUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const createDepartmentUseCase = new CreateDepartmentUseCase(
    departmentsRepository,
  )

  return createDepartmentUseCase
}
