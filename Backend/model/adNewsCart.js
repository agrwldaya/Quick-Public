import mongoose from "mongoose";

const AdnewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NormalUser",
        required: true
    },
    contentType: {
        type: String,
        default: "Ad"   
    },
    headline: { type: String, required: true },
    body: { type: String, required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    image: [{ type: String, required: true }],
    state: { type: String, required: true }, 
    city:{ type: String, required: true},
    pincode:{ type: Number, required: true},
    nearestCenterPc:{ type: Number, required: true},
    newspaper: { type: String, required: true },
    page:{type:String,enum:["National","State","Local"]},
    publishedDate: { type: Date, required: true },
    documents: [{ type: String, required: true }],  
    isCompanyVerified: { type: Boolean, required: true,default:false },
    price: { type: Number },
    paymentId:{type:String},
    isPaymentDone: { type: Boolean, default: false },
    size: { type: String },
    billing: { type: String},
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'published'],
        default: 'pending'
    }
});

export const AdNewsCart = mongoose.model("AdNewsCart", AdnewsSchema);
