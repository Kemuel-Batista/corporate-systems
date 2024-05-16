import { DepartmentsRepository } from '@/repositories/departments-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Department } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateDepartmentUseCaseRequest {
  name: string
  description: string
  createdBy: string
}

type CreateDepartmentUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    department: Department
  }
>

export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    name,
    description,
    createdBy,
  }: CreateDepartmentUseCaseRequest): Promise<CreateDepartmentUseCaseResponse> {
    const departmentAlreadyExists =
      await this.departmentsRepository.findByName(name)

    if (departmentAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const department = await this.departmentsRepository.create({
      name,
      description,
      createdBy,
    })

    return success({
      department,
    })
  }
}
