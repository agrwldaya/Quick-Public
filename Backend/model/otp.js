import mongoose from "mongoose";
import { mailSender } from "../utils/mailsender.js";
const otpSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
    otp:{type:Number,required:true},
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 10,
    },
})
async function sendVerificationEmail(email, otp) {
    try {
      const mailResponse = await mailSender(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
  }
  otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
     
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });

const Otpmodel = mongoose.model.Otp|| mongoose.model("Otp",otpSchema)
export default Otpmodel;