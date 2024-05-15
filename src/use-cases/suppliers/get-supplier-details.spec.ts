import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { GetSupplierDetailsUseCase } from './get-supplier-details'
import { makeSupplier } from 'test/factories/make-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: GetSupplierDetailsUseCase

describe('Get supplier details', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new GetSupplierDetailsUseCase(inMemorySuppliersRepository)
  })

  it('should be able to get supplier details', async () => {
    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const result = await sut.execute({
      id: supplier.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      supplier: expect.objectContaining({
        id: supplier.id,
        name: supplier.name,
        description: supplier.description,
        createdBy: supplier.createdBy,
        createdAt: supplier.createdAt,
        updatedAt: supplier.updatedAt,
      }),
    })
  })
})
