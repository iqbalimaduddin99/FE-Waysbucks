const express = require('express')

const router = express.Router()

const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

const { checkAuth } = require('../controllers/auth')


// User

const { register, 
        login,
        getUsers, 
        deleteUser,
        editUser} = require('../controllers/user')
        
const { addProduct,
        getProducts,
        getProduct,
        editProduct,
        deleteProduct,
        qty } = require('../controllers/product')

const { addTopping,
        getToppings,
        getTopping,
        editTopping,
        deleteTopping } = require('../controllers/topping')

        
const { addTransaction } = require('../controllers/transaction')


//Route User

router.get('/authorization', auth, checkAuth)

router.post('/register', register)
router.post('/login', login)
router.get('/users', auth, getUsers)
router.get('/user/:id', auth, deleteUser)
router.patch('/user', uploadFile("imageFile"), auth, editUser)


router.get('/products', getProducts)
router.post('/product', uploadFile("imageFile"), auth, addProduct)
router.get('/product/:id', auth, getProduct)
router.patch('/product/:id', uploadFile("imageFile"), auth, editProduct)
router.delete('/product/:id', auth, deleteProduct)


router.get('/toppings', auth, getToppings)
router.post('/topping', auth, uploadFile("imageFile"), addTopping)
router.get('/topping/:id', auth, getTopping)
router.patch('/topping/:id', auth, uploadFile("imageFile"), editTopping)
router.delete('/topping/:id', auth, deleteTopping)

// router.get('/transactions', auth, getToppings)
router.post('/transaction', auth, addTransaction)
// router.get('/topping/:id', auth, getTopping)
// router.patch('/topping/:id', auth, uploadFile("imageFile"), editTopping)
// router.delete('/topping/:id', auth, deleteTopping)

module.exports = router