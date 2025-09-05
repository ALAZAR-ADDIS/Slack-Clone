import { Inngest } from "inngest";
import {initDb} from "./db.js"
import User from "../models/user.models.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

const syncUser = inngest.createFunction(
    {id:"sync-user"},{event:"clerk/user.created"},async ({event}) => {
    await initDb()
    const { id, email_addresses, first_name, last_name,image_url } = event.data
    const newUser = { name:`${first_name} ${last_name}` ,email:email_addresses[0]?.email_address,image:image_url,clerkId:id}
    await  User.create (newUser)
    }
)


const deletUser = inngest.createFunction(
    { id: "delete-user-from-db" }, { event: "clerk/user.delete" }, async ({ event }) => {
        await initDb()
        const { id} = event.data
       
        await User.deleteOne({clerkId:id})
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser,deletUser];