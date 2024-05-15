import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'
import { GetSupplierDetailsUseCase } from '../get-supplier-details'

export function makeGetSupplierDetailsUseCase() {
  const suppliersRepository = new PrismaSuppliersRepository()
  const getSupplierDetailsUseCase = new GetSupplierDetailsUseCase(
    suppliersRepository,
  )

  return getSupplierDetailsUseCase
}
