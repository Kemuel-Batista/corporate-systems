import { InMemorySalesRepository } from 'test/in-memory/in-memory-sales-repository'
import { ListSalesUseCase } from './list-sales'
import { InMemorySaleDetailsRepository } from 'test/in-memory/in-memory-sale-details-repository'
import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { makeClient } from 'test/factories/make-client'
import { makeSale } from 'test/factories/make-sale'

let inMemorySaleDetailsRepository: InMemorySaleDetailsRepository
let inMemorySalesRepository: InMemorySalesRepository
let inMemoryClientsRepository: InMemoryClientsRepository

let sut: ListSalesUseCase

describe('List sales', () => {
  beforeEach(() => {
    inMemorySaleDetailsRepository = new InMemorySaleDetailsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleDetailsRepository,
    )
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new ListSalesUseCase(inMemorySalesRepository)
  })

  it('should be able to list sales', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const saleFactory = makeSale({
      clientId: client.id,
    })
    const sale = await inMemorySalesRepository.create(saleFactory)

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toMatchObject({
      sales: expect.arrayContaining([expect.objectContaining(sale)]),
    })
  })

  it('should be able to list paginated sales', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    for (let i = 1; i <= 22; i++) {
      const saleFactory = makeSale({
        clientId: client.id,
      })
      await inMemorySalesRepository.create(saleFactory)
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.sales).toHaveLength(2)
    }
  })

  it('should be able to list sales by invoice number', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const sale01Factory = makeSale({
      clientId: client.id,
      invoiceNumber: '123',
    })
    const sale01 = await inMemorySalesRepository.create(sale01Factory)

    const sale02Factory = makeSale({
      clientId: client.id,
      invoiceNumber: '123',
    })
    const sale02 = await inMemorySalesRepository.create(sale02Factory)

    const sale03Factory = makeSale({
      clientId: client.id,
      invoiceNumber: '3123213',
    })
    await inMemorySalesRepository.create(sale03Factory)

    const result = await sut.execute({
      page: 1,
      invoiceNumber: '123',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.sales).toHaveLength(2)
    }

    expect(result.value).toMatchObject({
      sales: expect.arrayContaining([
        expect.objectContaining(sale01),
        expect.objectContaining(sale02),
      ]),
    })
  })

  it('should be able to list sales by sale date', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const sale01Factory = makeSale({
      clientId: client.id,
      saleDate: new Date(2024, 4, 21),
    })
    await inMemorySalesRepository.create(sale01Factory)

    const sale02Factory = makeSale({
      clientId: client.id,
      saleDate: new Date(),
    })
    const sale02 = await inMemorySalesRepository.create(sale02Factory)

    const sale03Factory = makeSale({
      clientId: client.id,
      saleDate: new Date(),
    })
    const sale03 = await inMemorySalesRepository.create(sale03Factory)

    const result = await sut.execute({
      page: 1,
      saleDate: new Date(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.sales).toHaveLength(2)
    }

    expect(result.value).toMatchObject({
      sales: expect.arrayContaining([
        expect.objectContaining(sale02),
        expect.objectContaining(sale03),
      ]),
    })
  })
})
