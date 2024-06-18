import { Either, failure, success } from '@/core/either'
import { DepartmentsRepository } from '@/repositories/departments-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'

interface DeleteDepartmentUseCaseRequest {
  id: string
  deletedBy: string
}

type DeleteDepartmentUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteDepartmentUseCase {
  constructor(
    private departmentsRepository: DepartmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    deletedBy,
  }: DeleteDepartmentUseCaseRequest): Promise<DeleteDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id)

    if (!department) {
      return failure(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(deletedBy)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    await this.departmentsRepository.delete(id, deletedBy)

    return success(null)
  }
}
