import { InMemoryDepartmentsRepository } from 'test/in-memory/in-memory-departments-repository'
import { ListDepartmentsUseCase } from './list-departments'
import { makeDepartment } from 'test/factories/make-department'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: ListDepartmentsUseCase

describe('List Departments', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new ListDepartmentsUseCase(inMemoryDepartmentsRepository)
  })

  it('should list all departments', async () => {
    const department1Factory = makeDepartment()
    const department1 =
      await inMemoryDepartmentsRepository.create(department1Factory)

    const department2Factory = makeDepartment()
    const department2 =
      await inMemoryDepartmentsRepository.create(department2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      departments: expect.arrayContaining([
        expect.objectContaining(department1),
        expect.objectContaining(department2),
      ]),
    })
  })
})
