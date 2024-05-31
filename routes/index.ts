import express from "express"
const Router=express.Router()
import {queryBook,uploadBook } from "../controllers"

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



Router.post('/upload',upload.single("file"), uploadBook);
Router.post('/query', queryBook);
export default Router