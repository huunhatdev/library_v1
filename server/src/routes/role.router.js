const express = require('express')
const { roleController } = require('../controllers')
const roleRouter = express.Router()

roleRouter.get('/', roleController.getRoles)
roleRouter.get('/:id', roleController.getRoleById)
// roleRouter.post('/', roleController.createRole)
roleRouter.put('/:id', roleController.updateRole)
// roleRouter.delete('/:id', roleController.deleteRole)

module.exports = roleRouter
