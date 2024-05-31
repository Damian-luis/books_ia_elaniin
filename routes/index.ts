import express from "express"
const Router=express.Router()
import {queryBook,uploadBook,getAllBooks,deleteBook } from "../controllers"

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



Router.post('/upload',upload.single("file"), uploadBook);
Router.post('/query', queryBook);
Router.post('/get', getAllBooks);
Router.delete('/delete/:id', deleteBook);
export default Router