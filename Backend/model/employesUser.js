import mongoose, { mongo } from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    clinte:{type:mongoose.Schema.Types.ObjectId,ref:"Clint"},
    empName:{type:String},
    empCompany:{type:String,required:true},
    empMail:{type:String,unique:true},
    empPhoneNo:{type:String},
    state:{type:String},
    city:{type:String},
    pincode:{type:String},
    password:{type:String,required:true},
    proofId:[{type:String}],
    role:{type:String,enum:["National","state","local"],default:"local"},
    employeeVerified: {type: Boolean,default: false,},
    allLocalNewsCart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LocalNewsCart"
    }],
    allAdNewsCart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdNewsCart"
    }],
     
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,}
    })

export const EmployeeModel =  mongoose.model("Employee",EmployeeSchema)
