import { Express } from "express";
import express from "express"
import { configDotenv}from "dotenv"
import Router from "../routes";
class Server{
    public app:Express
    private PORT
    constructor(){
        configDotenv()
        this.app=express()
        this.PORT=process.env.PORT || 3006
        this.routes() 
        
    }
    startServer():void{
        this.app.listen(this.PORT,()=>{
            console.log("listening on port "+this.PORT)
        })
    }
    routes():void{
        this.app.use("/api",Router)
    }
    
    
}

export default Server