import mongoose, { mongo } from "mongoose";

const ClintSchema = new mongoose.Schema({
    companyName:{type:String},
    companyMail:{type:String,required:true},
    CompanyCode:{type:String},
    phoneNo:{type:String},
    address:{type:String},
    password:{type:String,required:true},
    documents:[{type:String}],
    isdocumentVerified: {type: Boolean,default: false,},
    employeeList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }],
    logo:{type:String},
    isProfileComplete: {type: Boolean,default: false,},
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,}
    })

export const Clintmodel =  mongoose.model("Clint",ClintSchema)






