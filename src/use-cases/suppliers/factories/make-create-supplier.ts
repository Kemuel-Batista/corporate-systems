import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'
import { CreateSupplierUseCase } from '../create-supplier'

export function makeCreateSupplierUseCase() {
  const suppliersRepository = new PrismaSuppliersRepository()
  const createSupplierUseCase = new CreateSupplierUseCase(suppliersRepository)

  return createSupplierUseCase
}
