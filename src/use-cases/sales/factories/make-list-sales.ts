import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { ListSalesUseCase } from '../list-sales'

export function makeListSalesUseCase() {
  const salesRepository = new PrismaSalesRepository()

  const listSalesUseCase = new ListSalesUseCase(salesRepository)

  return listSalesUseCase
}
