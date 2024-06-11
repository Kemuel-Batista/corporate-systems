import { Either, success } from '@/core/either'
import { PurchasesRepository } from '@/repositories/purchases-repository'
import { Purchase } from '@prisma/client'

type ListPurchasesUseCaseResponse = Either<
  null,
  {
    purchases: Purchase[]
  }
>

export class ListPurchasesUseCase {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async execute(): Promise<ListPurchasesUseCaseResponse> {
    const purchases = await this.purchasesRepository.list()

    return success({
      purchases,
    })
  }
}
