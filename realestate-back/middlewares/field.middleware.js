const { check, validationResult } = require('express-validator')
const { jsonResponse } = require('../lib/helper')

const emailCheck = [check('email', 'Email is required').notEmpty(), check('email', 'Email is not valid').isEmail()] 
const passwordCheck = [
  check('password', 'Password is required').notEmpty(),
  check('password', 'Password must be at least 6 character long').isLength({ min: 6 }),
  check('password', 'Password must contain a number and a character').matches(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/),
]

const validators = {
  login: [...emailCheck, check('password', 'Password is required').notEmpty()],
  register: [
    check('firstName', 'firstName is required').notEmpty(),
    check('lastName', 'lastName is required').notEmpty(),
    ...emailCheck,
    ...passwordCheck,
    check('age', 'Age must be a number').isNumeric(),
  ],
  email: emailCheck,
  password: passwordCheck,
  idCheck: [ check('_id', 'Not a valid ID').isMongoId() ],
  
  validate: (req, res, next) => {
    const { errors } = validationResult(req)
    if (!errors.length) {
      return next()
    }
    res.json(jsonResponse(errors, false))
  },
}

module.exports = validators