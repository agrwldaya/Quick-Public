import { EmployeeModel } from "../model/employesUser.js";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { LocalNewsCart } from "../model/localNewsCart.js";
import { AdNewsCart } from "../model/adNewsCart.js";

const emp_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Check if user exists
        const isExist = await EmployeeModel.findOne({ empMail: email });
        if (!isExist) {
            return res.status(400).json({
                success: false,
                message: "User not registered!"
            });
        }

        // Compare passwords
        const checkPassword = await bcrypt.compare(password, isExist.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect!"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: isExist._id, email: email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // optional: set token expiration
        });

        // Omit the password before sending the response
        isExist.password = undefined;

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: isExist    
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const get_news = async (req, res) => {
    try {
         
        const { userId } = req.body;

        
        const emp = await EmployeeModel.findById(userId)
            .populate('allLocalNewsCart')
            .populate('allAdNewsCart')
            .exec();

        if (!emp) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            localNews: emp.allLocalNewsCart,
            adNews: emp.allAdNewsCart,
        });
    } catch (error) {
        console.error("Error retrieving news:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving news.",
        });
    }
};

const accepted_news = async (req, res) => {
    try {
        const { newsId, userId } = req.body;

        // Check if the news exists in either collection
        const localNews = await LocalNewsCart.findById(newsId);
        const adNews = await AdNewsCart.findById(newsId);

        let updatedNews;
        if (localNews) {
            updatedNews = await LocalNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "accepted" } },
                { new: true }
            );
        } else if (adNews) {
            updatedNews = await AdNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "accepted" } },
                { new: true }
            );
        } else {
            return res.status(404).json({
                success: false,
                message: "News not found in either collection",
            });
        }

        res.status(200).json({
            success: true,
            message: "News Accepted",
            updatedNews, // Include updated news data if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while accepting the news",
        });
    }
};

const rejected_news = async (req, res) => {
    try {
        const { newsId, userId } = req.body;

        // Check if the news exists in either collection
        const localNews = await LocalNewsCart.findById(newsId);
        const adNews = await AdNewsCart.findById(newsId);

        let updatedNews;
        if (localNews) {
            updatedNews = await LocalNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "rejected" } },
                { new: true }
            );
        } else if (adNews) {
            updatedNews = await AdNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "rejected" } },
                { new: true }
            );
        } else {
            return res.status(404).json({
                success: false,
                message: "News not found in either collection",
            });
        }

        res.status(200).json({
            success: true,
            message: "News Rejected",
            updatedNews, // Include updated news data if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while accepting the news",
        });
    }
};

const published_news = async (req, res) => {
    try {
        const { newsId, userId } = req.body;

        // Check if the news exists in either collection
        const localNews = await LocalNewsCart.findById(newsId);
        const adNews = await AdNewsCart.findById(newsId);

        let updatedNews;
        if (localNews) {
            updatedNews = await LocalNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "published" } },
                { new: true }
            );
        } else if (adNews) {
            updatedNews = await AdNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "published" } },
                { new: true }
            );
        } else {
            return res.status(404).json({
                success: false,
                message: "News not found in either collection",
            });
        }

        res.status(200).json({
            success: true,
            message: "News Published",
            updatedNews, // Include updated news data if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while accepting the news",
        });
    }
};

const pending_news = async (req, res) => {
    try {
        const { newsId, userId } = req.body;

        // Check if the news exists in either collection
        const localNews = await LocalNewsCart.findById(newsId);
        const adNews = await AdNewsCart.findById(newsId);

        let updatedNews;
        if (localNews) {
            updatedNews = await LocalNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "pending" } },
                { new: true }
            );
        } else if (adNews) {
            updatedNews = await AdNewsCart.findByIdAndUpdate(
                newsId,
                { $set: { status: "pending" } },
                { new: true }
            );
        } else {
            return res.status(404).json({
                success: false,
                message: "News not found in either collection",
            });
        }

        res.status(200).json({
            success: true,
            message: "News not accepted",
            updatedNews, // Include updated news data if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while accepting the news",
        });
    }
};

const emp_profile = async(req,res)=>{
    try {
        const {userId} = req.body;

       const user = await EmployeeModel.findById({_id:userId});

       if(user){
        res.status(200).json({
            success:true,
            emp:user
        })
       }else{
        res.status(400).json({
            success:false,
            message:"Employee Not Found!"
        })
       }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error.."
        })
    }
}
export {emp_login,get_news,accepted_news,rejected_news,published_news,pending_news,emp_profile}