import mongoose from "mongoose";


const dbconnect = ()=>{
    // console.log(process.env.DBURL)
    
         mongoose.connect(process.env.DBURL)
         .then(()=>{
            console.log("Database connected!");
        })
       .catch ((error)=> {
        console.log("Error in datanase connection")
        console.error(error);
        process.exit(1);
    })
}
export default dbconnect;