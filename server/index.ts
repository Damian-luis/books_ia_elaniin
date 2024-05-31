import { Express } from "express";
import express from "express"
import { configDotenv}from "dotenv"
import Router from "../routes";
import Book from "../models/Book";
import sequelize from "../config/database";
class Server{
    public app:Express
    private PORT
    constructor(){
        configDotenv()
        this.app=express()
        this.PORT=process.env.PORT || 3006
        this.app.use(express.json())
        this.routes() 
        
    }
    startServer():void{
        sequelize.sync().then(() => {
            this.app.listen(this.PORT, () => {
                console.log("Listening on port " + this.PORT);
            });
        }).catch((error: any) => {
            console.error("Unable to connect to the database:", error);
        });
    }
    routes():void{
        this.app.use("/api",Router)
    }
    
    
}

export default Server