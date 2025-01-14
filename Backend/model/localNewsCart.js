import mongoose from "mongoose";

const LocalnewsSchema = new mongoose.Schema({
    userDetail:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NormalUser",
        required: true
    },
    contantType:{type:String,default:"local"},
    headline: { type: String, required: true },   
    body: { type: String, required: true },
    images: [{ type: String, required: true }],
    eventDate: { type: Date, required: true },
    eventTime: { type: String,},
    eventLocation: { type: String, required: true},
    eventState: { type: String, required: true},
    eventCity: { type: String, required: true},
    eventPincode: { type: String, required: true},
    nearestCenterPc:{ type: String, required: true},
    wordSize:{ type: String, required: true }, 
    newspaper: { type: String, required: true },
    message:{ type: String, required: true },
    price: { type: String},
    publishedDate: { type: Date, required: true },
    isPaymentDone: { type: Boolean, default: false },
    paymentId:{type:String},
    recipt: { type: String },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'published'],
        default: 'pending'
    },
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,}
});


export const LocalNewsCart = mongoose.model("LocalNewsCart", LocalnewsSchema);
