import { Warehouse, Prisma } from '@prisma/client'
import { WarehousesRepository } from '../warehouses-repository'
import { prisma } from '@/lib/prisma'
import { WarehouseStatus } from '@/enums/warehouse'

export class PrismaWarehousesRepository implements WarehousesRepository {
  async create({
    name,
    description,
    status,
    createdBy,
  }: Prisma.WarehouseUncheckedCreateInput): Promise<Warehouse> {
    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        description,
        status,
        createdBy,
      },
    })
    return warehouse
  }

  async update({
    id,
    name,
    description,
    status,
    updatedBy,
  }: Warehouse): Promise<Warehouse> {
    const warehouse = await prisma.warehouse.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        status: status ?? undefined,
        updatedBy,
      },
    })

    return warehouse
  }

  async findById(id: string): Promise<Warehouse | null> {
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id,
      },
    })

    return warehouse
  }

  async findByName(name: string): Promise<Warehouse | null> {
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        name,
      },
    })

    return warehouse
  }

  async list(): Promise<Warehouse[]> {
    const warehouses = await prisma.warehouse.findMany({
      where: {
        status: WarehouseStatus.ACTIVE,
      },
    })

    return warehouses
  }

  async delete(id: string): Promise<void> {
    await prisma.warehouse.delete({
      where: {
        id,
      },
    })
  }
}
