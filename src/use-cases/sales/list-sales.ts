import { Either, success } from '@/core/either'
import { SalesRepository } from '@/repositories/sales-repository'
import { Sale } from '@prisma/client'

interface ListSalesUseCaseRequest {
  page: number
  invoiceNumber?: string
  saleDate?: Date
}

type ListSalesUseCaseResponse = Either<
  null,
  {
    sales: Sale[]
  }
>

export class ListSalesUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    page,
    invoiceNumber,
    saleDate,
  }: ListSalesUseCaseRequest): Promise<ListSalesUseCaseResponse> {
    const sales = await this.salesRepository.list({
      page,
      invoiceNumber,
      saleDate,
    })

    return success({
      sales,
    })
  }
}
