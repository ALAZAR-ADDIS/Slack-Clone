import express from "express"
import { NODE_ENV, PORT } from "./config/env.js";
import { initDb } from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/ingest.js"
import { clerkMiddleware } from '@clerk/express'



const app = express()

app.use(clerkMiddleware())
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/", (req,res)=>{return res.send("This is the sent message")});

const Port =  PORT || 5000



const initServer = async()=>{
     try {
          await initDb()
          if(NODE_ENV === "development"){

               app.listen(Port, async () => {
                    console.log(`server has started at port ${Port}`)
               })

          }
          
     } catch (error) {
          console.error("Error occured",error)
          process.exit(1)
          
     }
}
initServer()

export default app
