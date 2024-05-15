import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { ListSuppliersUseCase } from './list-supplier'
import { makeSupplier } from 'test/factories/make-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: ListSuppliersUseCase

describe('List Suppliers', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new ListSuppliersUseCase(inMemorySuppliersRepository)
  })

  it('should list all suppliers', async () => {
    const supplier1Factory = makeSupplier()
    const supplier1 = await inMemorySuppliersRepository.create(supplier1Factory)

    const supplier2Factory = makeSupplier()
    const supplier2 = await inMemorySuppliersRepository.create(supplier2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      suppliers: expect.arrayContaining([
        expect.objectContaining(supplier1),
        expect.objectContaining(supplier2),
      ]),
    })
  })
})
