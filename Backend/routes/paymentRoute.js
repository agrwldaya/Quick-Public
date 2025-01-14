import express from "express"
import { HandlePayment } from "../controller/Payment.js"
import { authMiddleware } from "../middleware/authmiddle.js"

const paymentRoute  = express.Router()

paymentRoute.post('/payment',authMiddleware,HandlePayment)

export default paymentRoute