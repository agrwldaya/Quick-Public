import mongoose from "mongoose";

const NewsPaperSchema =  new mongoose.Schema({
    NewsPaperName:{
      type: String,
      required:true
    },
    newspaperLogo:{type:String},
    States:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"State"
    }]
})

const NewsPaperModel = mongoose.model.NewsPaper|| mongoose.model("NewsPaper",NewsPaperSchema)
export default NewsPaperModel;