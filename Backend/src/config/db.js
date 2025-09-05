import mongoose from "mongoose";
import { DB_URI } from "./env.js";


export const initDb = async()=>{
    try{
        const conn = await mongoose.connect(DB_URI)
        console.log("DB connected successfully",conn.connection.host)

    }catch(e){
        console.log("Db connection faild",e.message)
        process.exit(1)

    }
}