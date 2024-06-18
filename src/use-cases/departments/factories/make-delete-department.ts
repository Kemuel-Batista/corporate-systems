import { PrismaDepartmentsRepository } from '@/repositories/prisma/prisma-departments-repository'
import { DeleteDepartmentUseCase } from '../delete-department'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeDeleteDepartmentUseCase() {
  const departmentsRepository = new PrismaDepartmentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteDepartmentUseCase = new DeleteDepartmentUseCase(
    departmentsRepository,
    usersRepository,
  )

  return deleteDepartmentUseCase
}
