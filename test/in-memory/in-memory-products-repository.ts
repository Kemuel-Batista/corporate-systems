import { Product, Prisma } from '@prisma/client'
import { ProductsRepository } from '../../src/repositories/products-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: new Date(),
      createdBy: randomUUID(),
      updatedAt: null,
      updatedBy: null,
    }

    this.items.push(product)

    return product
  }

  async update(data: Product): Promise<Product> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const product = this.items[itemIndex]

    const productUpdated = {
      ...product,
      name: data.name,
      description: data.description,
      status: data.status,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = productUpdated

    return product
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id === id)

    if (!product) {
      return null
    }

    return product
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.items.find((item) => item.name === name)

    if (!product) {
      return null
    }

    return product
  }

  async list(): Promise<Product[]> {
    const products = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return products
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
