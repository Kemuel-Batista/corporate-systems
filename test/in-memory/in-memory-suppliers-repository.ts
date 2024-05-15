import { Supplier, Prisma } from '@prisma/client'
import { SuppliersRepository } from '../../src/repositories/suppliers-repository'
import { randomUUID } from 'node:crypto'

export class InMemorySuppliersRepository implements SuppliersRepository {
  public items: Supplier[] = []

  async create(data: Prisma.SupplierUncheckedCreateInput): Promise<Supplier> {
    const supplier = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: new Date(),
      createdBy: randomUUID(),
      updatedAt: null,
      updatedBy: null,
    }

    this.items.push(supplier)

    return supplier
  }

  async update(data: Supplier): Promise<Supplier> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const supplier = this.items[itemIndex]

    const supplierUpdated = {
      ...supplier,
      name: data.name,
      description: data.description,
      status: data.status,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = supplierUpdated

    return supplier
  }

  async findById(id: string): Promise<Supplier | null> {
    const supplier = this.items.find((item) => item.id === id)

    if (!supplier) {
      return null
    }

    return supplier
  }

  async findByName(name: string): Promise<Supplier | null> {
    const supplier = this.items.find((item) => item.name === name)

    if (!supplier) {
      return null
    }

    return supplier
  }

  async list(): Promise<Supplier[]> {
    const suppliers = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return suppliers
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
