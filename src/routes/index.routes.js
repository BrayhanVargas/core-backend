import express from 'express'
import { getUsers, login } from '../controllers/users.controller.js'
import {
  createReport,
  getReport,
  getReports
} from '../controllers/reports.controller.js'
import { verifyTokenMiddleware } from '../services/middleware/authMiddleware.service.js'

const router = express.Router()

router.post('/login', login)
router.get('/users', verifyTokenMiddleware, getUsers)

router.post('/reports', verifyTokenMiddleware, createReport)
router.get('/reports/:id', verifyTokenMiddleware, getReport)
router.get('/reports', getReports)

export default router
