const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/Shopping.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const vendor = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
  , quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})

const cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
const user = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  }
})

vendor.hasMany(product, { onDelete: 'cascade' });
product.belongsTo(vendor);

product.hasMany(cart, { onDelete: 'cascade' })
cart.belongsTo(product)

vendor.hasMany(cart, { onDelete: 'cascade' })
cart.belongsTo(vendor)

user.hasMany(cart, { onDelete: 'cascade' })
cart.belongsTo(user)

module.exports = {
  db,
  vendor, product, cart, user
}
