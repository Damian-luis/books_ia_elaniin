import express from "express"
const Router=express.Router()
import {queryBook,uploadBook,getAllBooks,deleteBook,getBookById } from "../controllers"

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage });



Router.post('/upload',upload.single("file"), uploadBook);
Router.post('/query/:idBook', queryBook);
Router.post('/get', getAllBooks);
Router.get('/getBook/:id',getBookById);
Router.delete('/delete/:id', deleteBook);
export default Router