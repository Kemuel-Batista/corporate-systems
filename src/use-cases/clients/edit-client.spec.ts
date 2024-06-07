import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { EditClientUseCase } from './edit-client'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { makeClient } from 'test/factories/make-client'

let inMemoryClientsRepository: InMemoryClientsRepository

let sut: EditClientUseCase

describe('Edit Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new EditClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to edit client', async () => {
    const clientFactory = makeClient()
    const client = await inMemoryClientsRepository.create(clientFactory)

    const result = await sut.execute({
      id: client.id,
      name: 'Client 01',
      cpf: 'Cpf 01',
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryClientsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Client 01',
          cpf: 'Cpf 01',
        }),
      ]),
    )
  })

  it('should not be able to edit client if it already exists', async () => {
    const clientFactory = makeClient({
      name: 'Client 01',
      cpf: 'Cpf 01',
    })
    await inMemoryClientsRepository.create(clientFactory)

    const clientFactory02 = makeClient({})
    const client02 = await inMemoryClientsRepository.create(clientFactory02)

    const result = await sut.execute({
      id: client02.id,
      name: 'Client 01',
      cpf: 'Cpf 01',
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
