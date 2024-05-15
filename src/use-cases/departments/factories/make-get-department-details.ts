import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { GetDepartmentDetailsUseCase } from '../get-department-details'

export function makeGetDepartmentDetailsUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const getDepartmentDetailsUseCase = new GetDepartmentDetailsUseCase(
    departmentsRepository,
  )

  return getDepartmentDetailsUseCase
}
