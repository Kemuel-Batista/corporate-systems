import { AccountReceivableMovement } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { AccountReceivableMovementType } from '@/enums/account-receivable-movement'

export function makeAccountReceivableMovement(
  override: Partial<AccountReceivableMovement> = {},
): AccountReceivableMovement {
  return {
    id: randomUUID(),
    financialSecurityId: randomUUID(),
    movementDate: faker.date.recent(),
    movementType: AccountReceivableMovementType.ABERTURA,
    movementValue: faker.number.int({ max: 10000 }),
    interestValue: faker.number.int({ max: 1000 }),
    fineValue: faker.number.int({ max: 1000 }),
    createdAt: new Date(),
    ...override,
  }
}
