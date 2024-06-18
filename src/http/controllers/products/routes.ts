import { Router } from 'express'
import { CreateProductController } from './create-product.controller'
import { EditProductController } from './edit-product.controller'
import { DeleteProductController } from './delete-product.controller'
import { ListProductController } from './list-product.controller'
import { GetProductDetailsController } from './get-product-details.controller'

const createProductController = new CreateProductController()
const editProductController = new EditProductController()
const deleteProductController = new DeleteProductController()
const listProductController = new ListProductController()
const getProductDetailsController = new GetProductDetailsController()

const productRoutes = Router()

productRoutes.post('/', createProductController.handle)
productRoutes.put('/:id', editProductController.handle)
productRoutes.delete('/:id', deleteProductController.handle)
productRoutes.get('/', listProductController.handle)
productRoutes.get('/:id', getProductDetailsController.handle)

export { productRoutes }
