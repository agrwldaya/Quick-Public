import mongoose from "mongoose";

const StateSchema =  new mongoose.Schema({
   Statename:{
      type: String,
      required:true
   },
   NewPapers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"NewsPaper"
   }]
})

const StateModel = mongoose.model.State|| mongoose.model("State",StateSchema)
export default StateModel;