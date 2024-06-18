import { Department, Prisma } from '@prisma/client'
import { DepartmentsRepository } from '../departments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDepartmentsRepository implements DepartmentsRepository {
  async create({
    name,
    description,
    createdBy,
  }: Prisma.DepartmentUncheckedCreateInput): Promise<Department> {
    const department = await prisma.department.create({
      data: {
        name,
        description,
        createdBy,
      },
    })
    return department
  }

  async update({
    id,
    name,
    description,
    updatedBy,
  }: Department): Promise<Department> {
    const department = await prisma.department.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        updatedAt: new Date(),
        updatedBy,
      },
    })

    return department
  }

  async findById(id: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
      where: {
        id,
      },
    })

    return department
  }

  async findByName(name: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
      where: {
        name,
      },
    })

    return department
  }

  async list(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
      where: {
        deletedAt: null,
      },
    })

    return departments
  }

  async delete(id: string, deletedBy: string): Promise<void> {
    await prisma.department.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
    })
  }
}
