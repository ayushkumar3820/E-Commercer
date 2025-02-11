
import mongoose, { model } from "mongoose";

const subscriptionSchema=new  mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    subscribedAt:{
        type:Date,
        default:Date.now
    },
})

const Subscription=mongoose.model("subscription",subscriptionSchema);
export default Subscription;