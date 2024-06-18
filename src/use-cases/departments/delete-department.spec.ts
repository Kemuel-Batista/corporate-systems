import { InMemoryDepartmentsRepository } from 'test/in-memory/in-memory-departments-repository'
import { DeleteDepartmentUseCase } from './delete-department'
import { makeDepartment } from 'test/factories/make-department'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: DeleteDepartmentUseCase

describe('Delete department', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteDepartmentUseCase(
      inMemoryDepartmentsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to delete department', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      id: department.id,
      deletedBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryDepartmentsRepository.items).toHaveLength(0)
  })
})
