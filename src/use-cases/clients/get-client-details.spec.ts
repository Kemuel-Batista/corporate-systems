import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { GetClientDetailsUseCase } from './get-client-details'
import { makeClient } from 'test/factories/make-client'

let inMemoryClientsRepository: InMemoryClientsRepository

let sut: GetClientDetailsUseCase

describe('Get client details', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new GetClientDetailsUseCase(inMemoryClientsRepository)
  })

  it('should be able to get client details', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const result = await sut.execute({
      id: client.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      client: expect.objectContaining({
        id: client.id,
        name: client.name,
        cpf: client.cpf,
        createdAt: client.createdAt,
      }),
    })
  })
})
