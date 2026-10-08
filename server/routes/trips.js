import { Router } from 'express'
import { trips } from '../data/trips.js'
const router = Router()
router.get('/', (_, res) => res.json(trips))
export default router
