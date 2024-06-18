import { Router } from 'express'
import { authRouter } from './http/controllers/users/auth.routes'
import { departmentRoutes } from './http/controllers/departments/routes'
import { userRoutes } from './http/controllers/users/user.routes'
import { ensureAuthenticated } from './http/middleware/ensure-authenticated'
import { warehouseRoutes } from './http/controllers/warehouses/routes'
import { productRoutes } from './http/controllers/products/routes'
import { supplierRoutes } from './http/controllers/suppliers/routes'
import { costCenterRoutes } from './http/controllers/cost-centers/routes'
import { productMovementRoutes } from './http/controllers/product-movements/routes'
import { requistionRoutes } from './http/controllers/requisitions/routes'
import { productQuoteRoutes } from './http/controllers/product-quotes/routes'
import { purchaseRoutes } from './http/controllers/purchases/routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRoutes)

router.use(ensureAuthenticated)
router.use('/departments', departmentRoutes)
router.use('/warehouse', warehouseRoutes)
router.use('/products', productRoutes)
router.use('/suppliers', supplierRoutes)
router.use('/cost-centers', costCenterRoutes)
router.use('/product-movement', productMovementRoutes)
router.use('/requisitions', requistionRoutes)
router.use('/product-quotes', productQuoteRoutes)
router.use('/purchases', purchaseRoutes)

export { router }
