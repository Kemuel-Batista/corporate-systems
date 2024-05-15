import { Either, success } from '@/core/either'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { Supplier } from '@prisma/client'

type ListSuppliersUseCaseResponse = Either<
  null,
  {
    suppliers: Supplier[]
  }
>

export class ListSuppliersUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute(): Promise<ListSuppliersUseCaseResponse> {
    const suppliers = await this.suppliersRepository.list()

    return success({
      suppliers,
    })
  }
}
