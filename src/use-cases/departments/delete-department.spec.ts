import { InMemoryDepartmentsRepository } from '@/repositories/in-memory/in-memory-departments-repository'
import { DeleteDepartmentUseCase } from './delete-department'
import { makeDepartment } from 'test/factories/make-department'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: DeleteDepartmentUseCase

describe('Delete department', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new DeleteDepartmentUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to delete department', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      id: department.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryDepartmentsRepository.items).toHaveLength(0)
  })
})
