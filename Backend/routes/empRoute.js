import express from "express"
const empRoute = express.Router();
import { authMiddleware } from "../middleware/authmiddle.js";
import { emp_login,get_news,accepted_news,rejected_news,published_news,pending_news,emp_profile } from "../controller/empAuth.js";
  



empRoute.post('/login',emp_login),
empRoute.post('/get_news',authMiddleware,get_news)
empRoute.post('/accept_news',authMiddleware,accepted_news)
empRoute.post('/reject_news',authMiddleware,rejected_news)
empRoute.post('/publish_news',authMiddleware,published_news)
empRoute.post('/pending_news',authMiddleware,pending_news)
empRoute.post('/emp_profile',authMiddleware,emp_profile)
export {empRoute};