import jwt from 'jsonwebtoken'

// NOTE: The secretKey should ideally be stored in environment variables for security.
const secretKey = 'secretKey' // TODO: Replace with process.env.SECRET_KEY

/**
 * Middleware to verify JWT token in the Authorization header.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
export const verifyTokenMiddleware = (req, res, next) => {
  const bearerHeader = req.header('Authorization')
  const token = bearerHeader?.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized access: Token not provided' })
  }

  const decodedToken = verifyToken(token)

  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized access: Invalid token' })
  }

  next()
}

/**
 * Generate a JWT token for the given user ID.
 * @param {string} userId - User ID for whom the token is generated.
 * @returns {string} - Generated JWT token.
 */
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' })
  return token
}

/**
 * Verify a JWT token.
 * @param {string} token - JWT token to be verified.
 * @returns {object|null} - Decoded token or null if verification fails.
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    return null
  }
}

export { generateToken, verifyToken }
