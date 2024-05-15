import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  update(data: Product): Promise<Product>
  findById(id: string): Promise<Product | null>
  findByName(name: string): Promise<Product | null>
  list(): Promise<Product[]>
  delete(id: string): Promise<void>
}
