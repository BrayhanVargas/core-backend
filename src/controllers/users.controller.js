import User from '../models/users.model.js'
import { generateToken } from '../services/middleware/authMiddleware.service.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    if (users.length === 0) res.status(404).json({ message: 'No users found' })
    res.json(users)
  } catch (error) {
    console.error('Error getting users from db', error)
    res.status(500).json({ error: 'Error getting users from db' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email,
        password
      }
    })

    if (user) {
      const token = generateToken(user.id)
      res.json({ token })
    } else {
      res.status(401).json({ error: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Error trying login', error)
    res.status(500).json({ error: 'Error trying login' })
  }
}
