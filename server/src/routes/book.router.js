const express = require('express')
const userRouter = express.Router()

userRouter.get('/', userController.getUser)
userRouter.get('/:id', userController.getUserById)
userRouter.post('/', userController.createUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter
