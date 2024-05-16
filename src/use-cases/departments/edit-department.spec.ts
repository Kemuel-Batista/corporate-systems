import { InMemoryDepartmentsRepository } from 'test/in-memory/in-memory-departments-repository'
import { EditDepartmentUseCase } from './edit-department'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { makeDepartment } from 'test/factories/make-department'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: EditDepartmentUseCase

describe('Edit Department', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new EditDepartmentUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to edit department', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      id: department.id,
      name: 'Department 01',
      description: 'Description 01',
      updatedBy: randomUUID(),
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

  it('should not be able to edit department if it already exists', async () => {
    const departmentFactory = makeDepartment({
      name: 'Department 01',
    })
    await inMemoryDepartmentsRepository.create(departmentFactory)

    const departmentFactory02 = makeDepartment({})
    const department02 =
      await inMemoryDepartmentsRepository.create(departmentFactory02)

    const result = await sut.execute({
      id: department02.id,
      name: 'Department 01',
      description: 'Description 01',
      updatedBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
