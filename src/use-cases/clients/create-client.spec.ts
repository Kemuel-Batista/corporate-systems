import { InMemoryClientsRepository } from 'test/in-memory/in-memory-clients-repository'
import { CreateClientUseCase } from './create-client'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'

let inMemoryClientsRepository: InMemoryClientsRepository

let sut: CreateClientUseCase

describe('Create Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()

    sut = new CreateClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to create client', async () => {
    const result = await sut.execute({
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

  it('should not be able to create client if it already exists', async () => {
    await sut.execute({
      name: 'Client 01',
      cpf: 'Cpf 01',
    })

    const result = await sut.execute({
      name: 'Client 01',
      cpf: 'Cpf 01',
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
