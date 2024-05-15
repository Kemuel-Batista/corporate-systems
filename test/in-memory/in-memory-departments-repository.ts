import { Department, Prisma } from '@prisma/client'
import { DepartmentsRepository } from '../../src/repositories/departments-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  public items: Department[] = []

  async create(
    data: Prisma.DepartmentUncheckedCreateInput,
  ): Promise<Department> {
    const department = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      createdBy: randomUUID(),
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
    }

    this.items.push(department)

    return department
  }

  async update(data: Department): Promise<Department> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const department = this.items[itemIndex]

    const departmentUpdated = {
      ...department,
      name: data.name,
      description: data.description,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = departmentUpdated

    return department
  }

  async findById(id: string): Promise<Department | null> {
    const department = this.items.find((item) => item.id === id)

    if (!department) {
      return null
    }

    return department
  }

  async findByName(name: string): Promise<Department | null> {
    const department = this.items.find((item) => item.name === name)

    if (!department) {
      return null
    }

    return department
  }

  async list(): Promise<Department[]> {
    const departments = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return departments
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
