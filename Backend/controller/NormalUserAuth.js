
import cloudinary from 'cloudinary';
import { NormalUserModel } from "../model/normalUser.js";
import { LocalNewsCart } from "../model/localNewsCart.js";
import { EmployeeModel } from "../model/employesUser.js";
import { AdNewsCart } from "../model/adNewsCart.js";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import Otpmodel from '../model/otp.js';


// Utility function to upload files to Cloudinary
const uploadFile = async (file, folder, quality) => {
  const options = { folder, resource_type: "auto" };
  if (quality) options.quality = quality;
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// Send OTP for Normal User

const Nu_sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await NormalUserModel.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is already registered`,
      });
    }

    let otp;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (await Otpmodel.findOne({ otp }));

    const otpPayload = { email, otp };
    await Otpmodel.create(otpPayload);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Normal User Login
const Nu_Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await NormalUserModel.findOne({ usermail: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect!",
      });
    }

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
    user.password = undefined; // Remove password from the response

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Normal User Signup
const Nu_signup = async (req, res) => {
  try {
    const { username, usermail, password, phoneNo, userState, userCity, userPincode, otp } = req.body;
    
    if (!username || !phoneNo || !usermail || !password || !userState || !userCity || !userPincode || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
   
    const checkMail = await NormalUserModel.findOne({ usermail });
    if (checkMail) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }
     
    const otpRecords = await Otpmodel.find({ email: usermail }).sort({ createdAt: -1 }).limit(1);
    
    if (otp != otpRecords[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      }); 
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const newUser = await  NormalUserModel.create({
      username,
      userCity,
      userPincode,
      userState,
      phoneNo,
      usermail,
      password: hashedPassword,
      isprofileComplete: true,
    });
 
     
    const token = jwt.sign({ id: newUser._id, email: usermail }, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      message: "Signup successful!",
      token,
      newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Submit Local News
const submitLocalNews = async (req, res) => {
  try {
    const {
      headline, body, eventDate, eventTime, eventLocation, eventState, eventCity, price,
      eventPincode, wordSize, newspaper, message, publishedDate, nearestCenterPc, userId,
    } = req.body;

     

    if (!headline || !body || !eventDate || !eventLocation || !eventState || !eventCity ||
      !eventPincode || !wordSize || !newspaper || !message || !price ||
      !publishedDate || !nearestCenterPc || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

   
    let uploadedImagesUrls = [];
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const supportedTypes = ["jpg", "jpeg", "png", "pdf"];

      for (const image of images) {
        const docType = image.name.split('.').pop().toLowerCase();
        if (!supportedTypes.includes(docType)) {
          return res.status(400).json({
            success: false,
            message: "File type not supported for documents!",
          });
        }
      }

      const uploadImagesPromises = images.map(async (image) => {
        const response = await uploadFile(image, process.env.FOLDER_NAME || 'default_folder');
        return response.url;
      });
      uploadedImagesUrls = await Promise.all(uploadImagesPromises);
    }
 
    const employee = await EmployeeModel.findOne({
      pincode: nearestCenterPc,
      empCompany: newspaper,
    });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Your Nearest office not Found!",
      });
    }

    // Create Local News Entry
    const localNews = new LocalNewsCart({
      userDetail: userId,
      headline, 
      body, 
      images: uploadedImagesUrls,
      eventDate, 
      eventTime, 
      eventLocation,
      eventState, 
      eventCity, 
      eventPincode, 
      nearestCenterPc, 
      wordSize, 
      newspaper, 
      message, 
      price,
      publishedDate
    });
    
    await localNews.save();
    

 
 
    // Update Employee and User models
    await EmployeeModel.findByIdAndUpdate(
      { _id: employee._id },
      { $push: { allLocalNewsCart: localNews._id } },
      { new: true }
    );

    await NormalUserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { LocalNewCart: localNews._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "News submitted successfully",
    });

  } catch (error) {
    console.error("Error submitting local news:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while submitting news",
    });
  }
};


// Submit Ad News
const submitAdNews = async (req, res) => {
  try {
    const {
      headline, body, companyName, address, state, newspaper, page, city, pincode,
      publishedDate, nearestCenterPc, size, price, userId,
    } = req.body;

    // Validate required fields
    if (!headline || !body || !companyName || !price || !address || !state || !newspaper ||
      !city || !pincode || !page || !publishedDate || !nearestCenterPc || !size || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate file uploads
    if (!req.files || !req.files.adImage || !req.files.companyProof) {
      return res.status(400).json({
        success: false,
        message: "Image and company proof are required",
      });
    }

    const { adImage, companyProof } = req.files;
     

    const supportedTypes = ["jpg", "jpeg", "png", "pdf"];

    // Validate ad image type
    const imageType = adImage.name.split('.').pop().toLowerCase();
    if (!supportedTypes.includes(imageType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported for image!",
      });
    }
  
    // Validate document type
    const docType = companyProof.name.split('.').pop().toLowerCase();
    if (!supportedTypes.includes(docType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported for documents!",
      });
    }

    // Upload files
    const uploadedImageUrl = await uploadFile(adImage, process.env.FOLDER_NAME || 'default_folder');
    const uploadedDocUrl = await uploadFile(companyProof, process.env.FOLDER_NAME || 'default_folder');
 

    // Find the nearest employee
    const employee = await EmployeeModel.findOne({
      pincode: nearestCenterPc,
      empCompany: newspaper,
    });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Your Nearest office not Found!",
      });
    }

    // Create ad news entry
    const adNews = new AdNewsCart({
      user: userId,
      headline,
      body,
      image: uploadedImageUrl.url,
      documents: uploadedDocUrl.url,
      companyName,
      address,
      state,
      newspaper,
      page,
      price,
      city,
      nearestCenterPc,
      pincode,
      publishedDate,
      size,
    });

    await adNews.save();

    // Update Employee and User models
    await EmployeeModel.findByIdAndUpdate(
      { _id: employee._id },
      { $push: { allAdNewsCart: adNews._id } },
      { new: true }
    );

    await NormalUserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { AdNewCart: adNews._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Ad news submitted successfully",
    });

  } catch (error) {
    console.error("Error submitting ad news:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while submitting ad news",
    });
  }
};



// Get User Information
const getUserInfo = async (req, res) => {
  try {
 
    
    // Fetch the user and populate cart fields
    const user = await NormalUserModel.findOne({ _id: req.body.userId })
      .populate("LocalNewCart")
      .populate("AdNewCart")
      .select("-password") // Exclude sensitive fields like password
      .exec();
      
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    
    return res.status(200).json({
      success: true,
      message: "User info retrieved successfully",
      LocalNews: user.LocalNewCart || [], // Default to an empty array
      AdNews: user.AdNewCart || [], // Default to an empty array
    });
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while retrieving user info",
    });
  }
};


// const GetlocalNews = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find the user by ID and populate the LocalNewCart field to get the news submissions
//     const user = await NormalUserModel.findById(userId).populate('LocalNewCart');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Local news retrieved successfully",
//       localNews: user.LocalNewCart, // Contains the array of local news submissions
//     });
//   } catch (error) {
//     console.error("Error retrieving local news:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while retrieving local news",
//     });
//   }
// };
// const GetAdNews = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find the user by ID and populate the AdNewCart field to get the ad news submissions
//     const user = await NormalUserModel.findById(userId).populate('AdNewCart');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Ad news retrieved successfully",
//       adNews: user.AdNewCart, // Contains the array of ad news submissions
//     });
//   } catch (error) {
//     console.error("Error retrieving ad news:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while retrieving ad news",
//     });
//   }
// };

const localNewsPayment = async (req, res) => {
  try {
    const { paymentId, userId } = req.body;
     
    // Check if required fields are provided
    if (!paymentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: paymentId or userId",
      });
    }
    // Find the latest LocalNewsCart entry for the specified user
    const latestNewsEntry = await LocalNewsCart.findOne({ userDetail:userId }).sort({ createdAt: -1 });
     
     
    if (!latestNewsEntry) {
      return res.status(404).json({
        success: false,
        message: "No news entry found for the specified user",
      });
    }

    // Update the local news entry with payment information
    const updatedNewsEntry = await LocalNewsCart.findByIdAndUpdate(
      latestNewsEntry._id,
      { $set: { paymentId, isPaymentDone: true } },
      { new: true }
    );

    // Check if the update was successful
    if (!updatedNewsEntry) {
      return res.status(404).json({
        success: false,
        message: "Failed to update the news entry",
      });
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "News submitted successfully!",
      data: updatedNewsEntry,
    });

  } catch (error) {
    console.error("Error updating local news payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment",
      error: error.message, // Optional: Include error message for debugging
    });
  }
};


const AdNewsPayment = async (req, res) => {
  try { 
    const { paymentId, userId } = req.body; // Accept userId to track the user
   
    
    // Check if required fields are provided
    if (!paymentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: paymentId or userId",
      });
    }

    // Find the latest AdNewsCart entry for the specified user
    const latestAdNewsEntry = await AdNewsCart.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!latestAdNewsEntry) {
      return res.status(404).json({
        success: false,
        message: "No Ad news entry found for the specified user",
      });
    }

    // Update the Ad news entry with payment information
    const updatedAdNewsEntry = await AdNewsCart.findByIdAndUpdate(
      latestAdNewsEntry._id,
      { $set: { paymentId, isPaymentDone: true } },
      { new: true }
    );
     

    // Check if the update was successful
    if (!updatedAdNewsEntry) {
      return res.status(404).json({
        success: false,
        message: "Failed to update the Ad news entry",
      });
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Ad news submitted successfully!",
      data: updatedAdNewsEntry,
    });

  } catch (error) {
    console.error("Error updating Ad news payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment",
    });
  }
};


export {getUserInfo,submitLocalNews,submitAdNews,Nu_signup,Nu_Login,Nu_sendOtp,localNewsPayment,AdNewsPayment}
