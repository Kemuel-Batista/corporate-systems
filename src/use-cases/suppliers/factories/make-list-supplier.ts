import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'
import { ListSuppliersUseCase } from '../list-supplier'

export function makeListSuppliersUseCase() {
  const suppliersRepository = new PrismaSuppliersRepository()
  const listSuppliersUseCase = new ListSuppliersUseCase(suppliersRepository)

  return listSuppliersUseCase
}
