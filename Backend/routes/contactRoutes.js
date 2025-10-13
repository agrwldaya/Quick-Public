import express from "express";
import { createContact } from "../controller/contactController.js";
 

const Contactrouter = express.Router();

Contactrouter.post("/contact", createContact);

export default Contactrouter;
