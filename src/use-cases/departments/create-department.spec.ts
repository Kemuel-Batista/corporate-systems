import { InMemoryDepartmentsRepository } from '@/repositories/in-memory/in-memory-departments-repository'
import { CreateDepartmentUseCase } from './create-department'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: CreateDepartmentUseCase

describe('Create Department', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new CreateDepartmentUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to create department', async () => {
    const result = await sut.execute({
      name: 'Department 01',
      description: 'Description 01',
      createdBy: randomUUID(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryDepartmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Department 01',
          description: 'Description 01',
        }),
      ]),
    )
  })

  it('should not be able to create department if it already exists', async () => {
    await sut.execute({
      name: 'Department 01',
      description: 'Description 01',
      createdBy: randomUUID(),
    })

    const result = await sut.execute({
      name: 'Department 01',
      description: 'Description 01',
      createdBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
