import { Either, success } from '@/core/either'
import { DepartmentsRepository } from '@/repositories/departments-repository'
import { Department } from '@prisma/client'

type ListDepartmentsUseCaseResponse = Either<
  null,
  {
    departments: Department[]
  }
>

export class ListDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(): Promise<ListDepartmentsUseCaseResponse> {
    const departments = await this.departmentsRepository.list()

    return success({
      departments,
    })
  }
}
