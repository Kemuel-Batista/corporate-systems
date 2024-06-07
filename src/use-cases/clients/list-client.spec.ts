import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { ListClientsUseCase } from './list-client'
import { makeClient } from 'test/factories/make-client'

let inMemoryClientsRepository: InMemoryClientsRepository

let sut: ListClientsUseCase

describe('List Clients', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new ListClientsUseCase(inMemoryClientsRepository)
  })

  it('should list all clients', async () => {
    const client1Factory = makeClient()
    const client1 = await inMemoryClientsRepository.create(client1Factory)

    const client2Factory = makeClient()
    const client2 = await inMemoryClientsRepository.create(client2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      clients: expect.arrayContaining([
        expect.objectContaining(client1),
        expect.objectContaining(client2),
      ]),
    })
  })
})
