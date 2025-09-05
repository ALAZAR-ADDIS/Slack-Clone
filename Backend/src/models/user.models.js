import mongoos from "mongoose"

const userSchema = new mongoos.Schema({
    name:{
        type:String,
        required:[true,"name field is required"]
    },
    email: {
        type: String,
        required: [true, "name field is required"],
        unique:true
    },
    image:{
        type: String,
        required: [true, "name field is required"],
    },
   clerkId:{
       type: String,
       required: [true, "name field is required"],
       unique:true
   }

},{timestamps:true})


const User = mongoos.model("User", userSchema)

export default User