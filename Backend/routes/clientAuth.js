import express from "express"
const ClientRoute = express.Router();
import { authMiddleware } from "../middleware/authmiddle.js";
import { client_sendOtp,clinte_Login,verif_company_mail,clinte_signup,AddEmployee,getClientDetails } from "../controller/ClintAuth.js";


ClientRoute.post('/verif_company_mail',verif_company_mail)
ClientRoute.post('/signup',authMiddleware,clinte_signup)
ClientRoute.post('/login',clinte_Login)
ClientRoute.post('/sendotp',client_sendOtp)
ClientRoute.post('/addemployee',authMiddleware,AddEmployee)
ClientRoute.get('/get_profile',authMiddleware,getClientDetails)
 

export {ClientRoute};