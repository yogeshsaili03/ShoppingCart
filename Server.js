const express = require('express')
const {
  db,
  vendor, product, cart, user
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/',
  express.static(__dirname + '/public')
)

app.get('/vendor', async (req, res) => {

  const Vendor = await vendor.findAll()
  res.send(Vendor)
})

app.post('/vendor', async (req, res) => {
  try {
    const result = await vendor.create({
      name: req.body.name,
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})
app.get('/user', async (req, res) => {

  User = await user.findOne({
    where: {
      name: req.query.name,
    }
  })
  if (User == null) {
    User = await user.create({
      name: req.query.name,
    })
  }
  res.send(User)
})

app.get('/product', async (req, res) => {

  const Product = await product.findAll({
    include: [vendor]
  })
  res.send(Product)
})

app.get('/cart', async (req, res) => {
  const Cart = await cart.findAll({
    where: { userId: req.query.userId },
    include: [{
      model: product,
      include: [vendor]
    }]
  })
  res.send(Cart)
})
app.post('/product', async (req, res) => {
  try {
    const result = await product.create({
      name: req.body.name,
      vendorId: parseInt(req.body.vendorId),
      price: parseInt(req.body.price),
      quantity: parseInt(req.body.quantity)
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/vendor/:id', async (req, res) => {
  const id = req.body.id
  try {
    cart.destroy({
      where: {
        vendorId: id
      }
    })
    vendor.destroy({
      where: {
        id: id
      }
    })
    res.send({ success: true })
  }
  catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/product/:id', async (req, res) => {
  const id = req.body.id
  try {
    product.destroy({
      where: {
        id: id
      }
    })
    res.send({ success: true })
  }
  catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/productcart/:id', async (req, res) => {
  const id = req.body.id
  vid = req.body.vid
  try {
    const Cart = await cart.count({
      where: { productId: req.body.id, userId: req.body.userId }
    })
    if (Cart > 0) {
      await cart.findOne({
        where: {
          productId: id,
          userId: req.body.userId
        }
      }).then((item) => {
        item.increment({
          quantity: 1
        })
      })

    } else {
      const result = await cart.create({
        productId: req.body.id,
        vendorId: vid,
        quantity: req.body.quantity,
        userId: req.body.userId
      })

    }
    const quan = await cart.findAll({
      where: { userId: req.body.userId }
    })
    res.send({ success: true, quan })
  }
  catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/productcartInc/:id', async (req, res) => {
  const id = req.body.id
  cart.increment({
    quantity: 1
  }, {
      where: {
        id: id,
      }
    })
  res.send({ success: true })
})

app.post('/productcartDec/:id', async (req, res) => {
  const id = req.body.id
  cart.decrement({
    quantity: 1
  }, {
      where: {
        id: id,
      }
    })
  res.send({ success: true })
})

app.post('/productcartDel/:id', async (req, res) => {
  const id = req.body.id
  try {
    cart.destroy({
      where: {
        Id: id
      }
    })
    res.send({ success: true })
  }
  catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/cartQuantity/:id', async (req, res) => {
  try {
    const quan = await cart.findAll({
      where: { userId: req.body.userId }
    })
    res.send({ success: true, quan })
  }
  catch (e) {
    res.send({ success: false, err: e.message })
  }
})

const PORT = process.env.PORT || 1234

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(PORT);
    })
  })
