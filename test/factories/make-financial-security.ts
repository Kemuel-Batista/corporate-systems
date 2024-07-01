import { FinancialSecurity } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { FinancialSecuritySituation } from '@/enums/financial-security'

export function makeFinancialSecurity(
  override: Partial<FinancialSecurity> = {},
): FinancialSecurity {
  return {
    id: randomUUID(),
    purchaseId: randomUUID(),
    saleId: null,
    invoiceNumber: faker.commerce.isbn(13),
    quota: faker.number.int({ max: 10 }),
    originalValue: faker.number.int({ max: 10000 }),
    dueDate: faker.date.future(),
    situation: FinancialSecuritySituation.PENDING,
    createdAt: new Date(),
    ...override,
  }
}
