import { PrismaPurchasesRepository } from '@/repositories/prisma/prisma-purchases-repository'
import { ListPurchasesUseCase } from '../list-purchases'

export function makeListPurchasesUseCase() {
  const purchasesRepository = new PrismaPurchasesRepository()

  const listPurchasesUseCase = new ListPurchasesUseCase(purchasesRepository)

  return listPurchasesUseCase
}
