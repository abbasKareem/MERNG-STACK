const { model, Schema } = require('mongoose')

const userShema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
})

module.exports = model('User', userShema)
