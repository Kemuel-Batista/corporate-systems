import { Warehouse, Prisma } from '@prisma/client'
import { WarehousesRepository } from '../../src/repositories/warehouses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryWarehousesRepository implements WarehousesRepository {
  public items: Warehouse[] = []

  async create(data: Prisma.WarehouseUncheckedCreateInput): Promise<Warehouse> {
    const warehouse = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: new Date(),
      createdBy: randomUUID(),
      updatedAt: null,
      updatedBy: null,
    }

    this.items.push(warehouse)

    return warehouse
  }

  async update(data: Warehouse): Promise<Warehouse> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const warehouse = this.items[itemIndex]

    const warehouseUpdated = {
      ...warehouse,
      name: data.name,
      description: data.description,
      status: data.status,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = warehouseUpdated

    return warehouse
  }

  async findById(id: string): Promise<Warehouse | null> {
    const warehouse = this.items.find((item) => item.id === id)

    if (!warehouse) {
      return null
    }

    return warehouse
  }

  async findByName(name: string): Promise<Warehouse | null> {
    const warehouse = this.items.find((item) => item.name === name)

    if (!warehouse) {
      return null
    }

    return warehouse
  }

  async list(): Promise<Warehouse[]> {
    const warehouses = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return warehouses
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
