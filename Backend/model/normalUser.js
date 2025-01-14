import mongoose, { mongo } from 'mongoose'

const normalUserShema = new mongoose.Schema({
      username:{type:String,required:true},
      usermail:{type:String,required:true},
      password:{type:String,required:true},
      phoneNo:{type:String,required:true},
      userState:{type:String},
      userCity:{type:String},
      userPincode:{type:String},
      role:{type:String,default:"NormalUser"},
      isprofileComplete:{type:Boolean,default:false},
      LocalNewCart:[{
      type:mongoose.Schema.Types.ObjectId,ref:"LocalNewsCart"}],
      AdNewCart:[{
      type:mongoose.Schema.Types.ObjectId,ref:"AdNewsCart"}],

      createdAt: {type: Date,default: Date.now,},

      updatedAt: {type: Date,default: Date.now,}
})

export const NormalUserModel  = mongoose.model("NormalUser",normalUserShema)

