import { Supplier, Prisma } from '@prisma/client'
import { SuppliersRepository } from '../suppliers-repository'
import { prisma } from '@/lib/prisma'
import { SupplierStatus } from '@/enums/supplier'

export class PrismaSuppliersRepository implements SuppliersRepository {
  async create({
    name,
    description,
    status,
    createdBy,
  }: Prisma.SupplierUncheckedCreateInput): Promise<Supplier> {
    const supplier = await prisma.supplier.create({
      data: {
        name,
        description,
        status,
        createdBy,
      },
    })
    return supplier
  }

  async update({
    id,
    name,
    description,
    status,
    updatedBy,
  }: Supplier): Promise<Supplier> {
    const supplier = await prisma.supplier.update({
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

    return supplier
  }

  async findById(id: string): Promise<Supplier | null> {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id,
      },
    })

    return supplier
  }

  async findByName(name: string): Promise<Supplier | null> {
    const supplier = await prisma.supplier.findUnique({
      where: {
        name,
      },
    })

    return supplier
  }

  async list(): Promise<Supplier[]> {
    const suppliers = await prisma.supplier.findMany({
      where: {
        status: SupplierStatus.ACTIVE,
      },
    })

    return suppliers
  }

  async delete(id: string): Promise<void> {
    await prisma.supplier.delete({
      where: {
        id,
      },
    })
  }
}
