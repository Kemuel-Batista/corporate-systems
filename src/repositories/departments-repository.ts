import { Prisma, Department } from '@prisma/client'

export interface DepartmentsRepository {
  create(data: Prisma.DepartmentUncheckedCreateInput): Promise<Department>
  update(data: Department): Promise<Department>
  findById(id: string): Promise<Department | null>
  findByName(name: string): Promise<Department | null>
  list(): Promise<Department[]>
  delete(id: string): Promise<void>
}
