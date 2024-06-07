import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { DeleteClientUseCase } from './delete-client'
import { makeClient } from 'test/factories/make-client'

let inMemoryClientsRepository: InMemoryClientsRepository

let sut: DeleteClientUseCase

describe('Delete client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new DeleteClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to delete client', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const result = await sut.execute({
      id: client.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryClientsRepository.items).toHaveLength(0)
  })
})
