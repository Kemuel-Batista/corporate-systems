import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryPurchasesRepository } from 'test/in-memory/in-memory-purchases-repository'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { ConfirmPurchaseUseCase } from './confirm-purchase'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { makePurchase } from 'test/factories/make-purchase'
import { PurchaseStatus } from '@/enums/purchase'
import { MovementType } from '@/enums/product-movement'

let inMemoryPurchasesRepository: InMemoryPurchasesRepository
let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: ConfirmPurchaseUseCase

describe('Confirm purchase', () => {
  beforeEach(() => {
    inMemoryPurchasesRepository = new InMemoryPurchasesRepository()
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new ConfirmPurchaseUseCase(
      inMemoryPurchasesRepository,
      inMemoryProductMovementRepository,
      inMemoryWarehousesRepository,
    )
  })

  it('should be able to confirm a purchase', async () => {
    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const purchaseFactory = makePurchase()
    const purchase = await inMemoryPurchasesRepository.create(purchaseFactory)

    const result = await sut.execute({
      id: purchase.id,
      warehouseId: warehouse.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryPurchasesRepository.items[0].status).toEqual(
      PurchaseStatus.CLOSED,
    )

    expect(inMemoryProductMovementRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: purchase.productId,
          movementType: MovementType.ENTRY_BY_PURCHASE,
          quantity: purchase.quantity,
          value: purchase.unitCost,
          warehouseId: warehouse.id,
        }),
      ]),
    )
  })
})
