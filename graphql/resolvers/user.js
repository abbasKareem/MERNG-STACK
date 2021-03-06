const bcyript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { UserInputError } = require('apollo-server')
const { SECERT_KEY } = require('../../config')
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECERT_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, vaild } = validateLoginInput(username, password)
      if (!vaild) {
        throw new UserInputError('Errors', {errors})
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      const match = await bcyript.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong Credetials'
        throw new UserInputError('Wrong Credetials', { errors })
      }

      const token = generateToken(user)
      return {
        ...user._doc,
        id: user.id,
        token,
      }
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // check if user input is valid
      const { vaild, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!vaild) {
        throw new UserInputError('Errors', { errors })
      }
      // Check if username already exist in database
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      //   hash the password
      password = await bcyript.hash(password, 12)

      //   add user to database
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()
      //  generate token
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res.id,
        token,
      }
    },
    //END OF FUNCTION BODY
  },
}
