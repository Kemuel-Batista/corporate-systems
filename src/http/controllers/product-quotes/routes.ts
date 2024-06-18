import { Router } from 'express'
import { CreateProductQuoteController } from './create-product-quote.controller'
import { ListProductQuotesByProductIdController } from './list-product-quotes-by-product-id.controller'

const createProductQuoteController = new CreateProductQuoteController()
const listProductQuotesByProductIdController =
  new ListProductQuotesByProductIdController()

const productQuoteRoutes = Router()

productQuoteRoutes.post('/', createProductQuoteController.handle)
productQuoteRoutes.get(
  '/by-product/:productId',
  listProductQuotesByProductIdController.handle,
)

export { productQuoteRoutes }
