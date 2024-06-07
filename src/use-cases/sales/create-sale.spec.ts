import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemorySaleDetailsRepository } from 'test/in-memory/in-memory-sale-details-repository'
import { InMemorySalesRepository } from 'test/in-memory/in-memory-sales-repository'
import { CreateSaleUseCase } from './create-sale'
import { makeClient } from 'test/factories/make-client'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryClientsRepository: InMemoryClientsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemorySalesRepository: InMemorySalesRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemorySaleDetailsRepository: InMemorySaleDetailsRepository

let sut: CreateSaleUseCase

describe('Create sale', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemorySaleDetailsRepository = new InMemorySaleDetailsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleDetailsRepository,
    )
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new CreateSaleUseCase(
      inMemoryClientsRepository,
      inMemoryUsersRepository,
      inMemorySalesRepository,
      inMemoryProductsRepository,
      inMemorySaleDetailsRepository,
    )
  })

  it('should be able to create a new sale', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const result = await sut.execute({
      clientId: client.id,
      invoiceNumber: '123',
      saleDate: new Date(),
      createdBy: user.id,
      saleDetails: [
        {
          productId: product.id,
          soldAmount: 100,
          unitPrice: 10000,
        },
      ],
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemorySalesRepository.items).toHaveLength(1)
    expect(inMemorySalesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          clientId: client.id,
          invoiceNumber: '123',
          saleDate: expect.any(Date),
          createdBy: user.id,
        }),
      ]),
    )

    expect(inMemorySaleDetailsRepository.items).toHaveLength(1)
    expect(inMemorySaleDetailsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product.id,
          soldAmount: 100,
          unitPrice: 10000,
        }),
      ]),
    )
  })

  it('should be able to create a sale even not exists product', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const result = await sut.execute({
      clientId: client.id,
      invoiceNumber: '123',
      saleDate: new Date(),
      createdBy: user.id,
      saleDetails: [
        {
          productId: 'any',
          soldAmount: 100,
          unitPrice: 10000,
        },
      ],
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemorySalesRepository.items).toHaveLength(1)
    expect(inMemorySalesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          clientId: client.id,
          invoiceNumber: '123',
          saleDate: expect.any(Date),
          createdBy: user.id,
        }),
      ]),
    )

    expect(inMemorySaleDetailsRepository.items).toHaveLength(0)
  })
})
