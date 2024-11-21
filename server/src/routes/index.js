const express = require('express')
const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const bookRouter = require('./book.router')
const categoryRouter = require('./category.router')
const recordRouter = require('./record.router')
const roleRouter = require('./role.router')
const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/book', bookRouter)
router.use('/category', categoryRouter)
router.use('/record', recordRouter)
router.use('/role', roleRouter)

module.exports = router
