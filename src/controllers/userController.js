const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {
    console.log('🟢 Incoming Request Body:', req.body) // Debugging input

    const { username, email, password } = req.body

    console.log('🔴 Username:', username)
    console.log('🔴 Email:', email)
    console.log('🔴 Password:', password ? '✔️ Provided' : '❌ Missing') // Ensure password is being received

    // Ensure fields are provided and not empty
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({
          message: 'All fields (username, email, password) are required'
        })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    user = new User({ username, email, password: hashedPassword })
    await user.save()

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email },
      token
    })
  } catch (error) {
    console.error('🛑 Error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    console.log('🟢 Incoming Login Request:', req.body)

    const { email, password } = req.body

    // Validate email & password input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) { return res.status(400).json({ message: 'Invalid credentials' }) }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.json({ message: 'Login successful', token })
  } catch (error) {
    console.error('🛑 Login Error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
