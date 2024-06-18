import { Router } from 'express'
import { CreateSupplierController } from './create-supplier.controller'
import { EditSupplierController } from './edit-supplier.controller'
import { DeleteSupplierController } from './delete-supplier.controller'
import { ListSupplierController } from './list-supplier.controller'
import { GetSupplierDetailsController } from './get-supplier-details.controller'

const createSupplierController = new CreateSupplierController()
const editSupplierController = new EditSupplierController()
const deleteSupplierController = new DeleteSupplierController()
const listSupplierController = new ListSupplierController()
const getSupplierDetailsController = new GetSupplierDetailsController()

const supplierRoutes = Router()

supplierRoutes.post('/', createSupplierController.handle)
supplierRoutes.put('/:id', editSupplierController.handle)
supplierRoutes.delete('/:id', deleteSupplierController.handle)
supplierRoutes.get('/', listSupplierController.handle)
supplierRoutes.get('/:id', getSupplierDetailsController.handle)

export { supplierRoutes }
