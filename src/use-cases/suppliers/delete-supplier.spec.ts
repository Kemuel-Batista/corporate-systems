import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { DeleteSupplierUseCase } from './delete-supplier'
import { makeSupplier } from 'test/factories/make-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: DeleteSupplierUseCase

describe('Delete supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new DeleteSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to delete supplier', async () => {
    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const result = await sut.execute({
      id: supplier.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemorySuppliersRepository.items).toHaveLength(0)
  })
})
