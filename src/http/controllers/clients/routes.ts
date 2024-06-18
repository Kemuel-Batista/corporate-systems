import { Router } from 'express'
import { CreateClientController } from './create-client.controller'
import { EditClientController } from './edit-client.controller'
import { DeleteClientController } from './delete-client.controller'
import { ListClientController } from './list-client.controller'
import { GetClientDetailsController } from './get-client-details.controller'

const createClientController = new CreateClientController()
const editClientController = new EditClientController()
const deleteClientController = new DeleteClientController()
const listClientController = new ListClientController()
const getClientDetailsController = new GetClientDetailsController()

const clientRoutes = Router()

clientRoutes.post('/', createClientController.handle)
clientRoutes.put('/:id', editClientController.handle)
clientRoutes.delete('/:id', deleteClientController.handle)
clientRoutes.get('/', listClientController.handle)
clientRoutes.get('/:id', getClientDetailsController.handle)

export { clientRoutes }
