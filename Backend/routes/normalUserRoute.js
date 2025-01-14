import express from "express"
const NormalUserRoute = express.Router();
import { authMiddleware } from "../middleware/authmiddle.js";
import { submitAdNews,submitLocalNews,Nu_signup,Nu_Login ,Nu_sendOtp,getUserInfo,localNewsPayment ,AdNewsPayment} from "../controller/NormalUserAuth.js";
 

NormalUserRoute.post('/login',Nu_Login)
NormalUserRoute.post('/signup',Nu_signup)
NormalUserRoute.post('/sendotp',Nu_sendOtp)
NormalUserRoute.post('/profile',authMiddleware,getUserInfo)
NormalUserRoute.post('/submitlocalnews',authMiddleware,submitLocalNews)
NormalUserRoute.post('/submitadnews',authMiddleware,submitAdNews)
NormalUserRoute.post('/final_localnews_submit',authMiddleware,localNewsPayment)
NormalUserRoute.post('/final_adnews_submit',authMiddleware,AdNewsPayment)


export {NormalUserRoute};