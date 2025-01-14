import express from 'express'
import { getNewsPaperDetail } from '../controller/NewsStatus.js'

const NewsPaperRoute = express.Router()

NewsPaperRoute.get('/get_newspaper',getNewsPaperDetail)
export {NewsPaperRoute}



