import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { SaleDetailsRepository } from '@/repositories/sale-details-repository'
import { SalesRepository } from '@/repositories/sales-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Sale } from '@prisma/client'

interface CreateSaleUseCaseRequest {
  clientId: string
  invoiceNumber: string
  saleDate: Date
  createdBy: string
  saleDetails: {
    productId?: string
    soldAmount?: number
    unitPrice?: number
  }[]
}

type CreateSaleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

export class CreateSaleUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private usersRepository: UsersRepository,
    private salesRepository: SalesRepository,
    private productsRepository: ProductsRepository,
    private saleDetailsRepository: SaleDetailsRepository,
  ) {}

  async execute({
    clientId,
    invoiceNumber,
    saleDate,
    createdBy,
    saleDetails,
  }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      return failure(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(createdBy)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const sale = await this.salesRepository.create({
      clientId,
      invoiceNumber,
      saleDate,
      createdBy,
    })

    for (const saleDetail of saleDetails) {
      const product = await this.productsRepository.findById(
        saleDetail.productId,
      )

      if (!product) {
        continue
      }

      await this.saleDetailsRepository.create({
        saleId: sale.id,
        productId: saleDetail.productId,
        soldAmount: saleDetail.soldAmount,
        unitPrice: saleDetail.unitPrice,
      })
    }

    return success({
      sale,
    })
  }
}
