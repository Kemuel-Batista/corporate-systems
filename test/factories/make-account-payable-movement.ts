import { AccountPayableMovement } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { AccountPayableMovementType } from '@/enums/account-payable-movement'

export function makeAccountPayableMovement(
  override: Partial<AccountPayableMovement> = {},
): AccountPayableMovement {
  return {
    id: randomUUID(),
    financialSecurityId: randomUUID(),
    movementDate: faker.date.recent(),
    movementType: AccountPayableMovementType.ABERTURA,
    movementValue: faker.number.int({ max: 10000 }),
    interestValue: faker.number.int({ max: 1000 }),
    fineValue: faker.number.int({ max: 1000 }),
    createdAt: new Date(),
    ...override,
  }
}
