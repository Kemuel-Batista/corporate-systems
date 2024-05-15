import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'
import { EditSupplierUseCase } from '../edit-supplier'

export function makeEditSupplierUseCase() {
  const suppliersRepository = new PrismaSuppliersRepository()
  const editSupplierUseCase = new EditSupplierUseCase(suppliersRepository)

  return editSupplierUseCase
}
