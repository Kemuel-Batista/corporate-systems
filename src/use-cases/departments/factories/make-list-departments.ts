import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { ListDepartmentsUseCase } from '../list-departments'

export function makeListDepartmentsUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const listDepartmentsUseCase = new ListDepartmentsUseCase(
    departmentsRepository,
  )

  return listDepartmentsUseCase
}
