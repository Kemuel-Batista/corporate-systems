import { Product, Prisma } from '@prisma/client'
import { ProductsRepository } from '../products-repository'
import { prisma } from '@/lib/prisma'
import { ProductStatus } from '@/enums/product'

export class PrismaProductsRepository implements ProductsRepository {
  async create({
    name,
    description,
    status,
    createdBy,
  }: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        status,
        createdBy,
      },
    })
    return product
  }

  async update({
    id,
    name,
    description,
    status,
    updatedBy,
  }: Product): Promise<Product> {
    const product = await prisma.product.update({
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

    return product
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    })

    return product
  }

  async list(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
      },
    })

    return products
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
