import NewsPaperModel from "../model/newspaper.js"


const getNewsPaperDetail = async(req,res)=>{
    try {
        const newspaper = await NewsPaperModel.find({});
        if(!newspaper){
            return res.status(400).json({
                success:false,
                message:"No Newspaper Registered On this Website!"
            })
        }
        return res.status(200).json({
            success:true,
             newspaper
        })


    } catch (error) {
        console.error("Error retrieving ad news:", error);
            return res.status(500).json({
              success: false,
              message: "Error occurred while retrieving newspaper Details",
            });
    }
}

export {getNewsPaperDetail}