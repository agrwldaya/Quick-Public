
import { Clintmodel } from "../model/clintUser.js";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Otpmodel from "../model/otp.js";
import  otpGenerator from 'otp-generator'
import cloudinary from 'cloudinary';
 
import { EmployeeModel } from "../model/employesUser.js";
import NewsPaperModel from "../model/newspaper.js";
 

 const uploadFile = async (file, folder, quality) => {
  const options = { folder, resource_type: "auto" };
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

 const completeProfile = async (req, res) => {
    try {
        const { companyName, CompanyCode, states, userId } = req.body;
        const { images } = req.files;
     
        
        // Find client based on userId
        const client = await Clintmodel.findOne({ ClintBasicDetail: userId });
        // Check if client exists
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found!",
            });
        }

        // Check if company mail is verified
        if (!client.companyMailVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify email first!",
            });
        }

        // Check if all required fields are provided
        if (!companyName || !CompanyCode || !states) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        // Check if images are uploaded and are an array
        if (!images || !Array.isArray(images)) {
            return res.status(400).json({
                success: false,
                message: "No images were uploaded.",
            });
        }
    
        const supportedTypes = ["jpg", "jpeg", "png", 'pdf'];

        // Check each image type
        for (const image of images) {
            const imageType = image.name.split('.').pop().toLowerCase();
            if (!supportedTypes.includes(imageType)) {
                return res.status(400).json({
                    success: false,
                    message: "File type not supported!",
                });
            }
        }

        // Normalize companyName: each word's first letter uppercase, rest lowercase
        const normalizeCompanyName = (name) => {
            return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        };
        
        const normalizedCompanyName = normalizeCompanyName(companyName);

        // Upload images
        const uploadPromises = images.map(async (image) => {
            const response = await uploadFile(image, process.env.FOLDER_NAME || 'default_folder');
            return response.url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        // Update client profile
        const updatedClientProfile = await Clintmodel.findByIdAndUpdate(
            { _id: client._id },
            {
                companyName: normalizedCompanyName,
                CompanyCode:CompanyCode,
                documents: uploadedUrls,
                documentVerified: true,
                states,
                isProfileComplete: true,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Client profile completed!",
            clintprofile: updatedClientProfile,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

  const client_sendOtp = async(req,res)=>{
    try {
      const {email} = req.body;
      const checkUserPresent = await   Clintmodel.findOne({ email });
     
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: `User is already registered`,
        });
      }
  
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
  
    let result = await Otpmodel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otpmodel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await Otpmodel.create(otpPayload);
  
    
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
      
    });
  } catch (error) {
     
    return res.status(500).json({ success: false, error: error.message });
  }
}

const clinte_Login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const clinte = await   Clintmodel.findOne({ companyMail: email });
        
        if (!clinte) {
            return res.status(401).json({
                status: false,
                message: "clinte not registered!"
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password, clinte.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                success: false,
                message: "Password is incorrect!"
            });
        }
  
        const token = jwt.sign({ id: clinte._id, email: email}, process.env.JWT_SECRET);
        clinte.password= undefined
  
        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            clinte,
        });
    } catch (error) {
         
        return res.status(500).json({
            success: false,
            message: "Error"  
        });
    }
};

const verif_company_mail = async (req, res) => {
    try {
        const { companyName, companyMail, password, otp } = req.body;
            
         
        if (!companyName || !companyMail || !otp || !password) {
            return res.status(402).json({
                success: false,
                message: "All fields are required!"
            });
        }
         

        // Check if the company mail already exists
        const checkMail = await Clintmodel.findOne({ companyMail });
        if (checkMail) {
            return res.status(409).json({
                success: false,
                message: "Email already verified!"
            })
        }
 
        // Fetch the most recent OTP record for the given email
      const otpRecords = await Otpmodel.find({ email: companyMail }).sort({ createdAt: -1 }).limit(1);
       
        // Check if OTP record exists and if the provided OTP matches the most recent one
        if (!otpRecords.length || otp != otpRecords[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new client
        const newUser = new Clintmodel({
            companyName,
            companyMail,
            CompanyCode: "",
            phoneNo: "",
            address: "",
            documents: "",
            password: hashedPassword,
            employeeList: [],
        });

        // Save the new client to the database
        await newUser.save();

        // Generate a JWT token for the new client
        const token = jwt.sign({ id: newUser._id, email: companyMail }, process.env.JWT_SECRET);

        // Respond with success, token, and user details
        return res.status(201).json({
            success: true,
            message: "Email verified successfully!",
            token,
            newUser,
        });

    } catch (error) {
        console.error("Error in verif_company_mail:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


  const clinte_signup = async (req, res) => {
    try {
        const { CompanyCode, phoneNo, address, userId } = req.body;

        // Validate required fields
        if (!CompanyCode || !phoneNo || !address || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
        // Validate file upload
        const { documents,logo } = req.files;
        if (!documents) {
            return res.status(400).json({
                success: false,
                message: "Please upload documents"
            });
        }
        if(!logo){
            return res.status(400).json({
                success: false,
                message: "Please upload logo"
            });
        }

        // Validate document types
        const supportedTypes = ["jpg", "jpeg", "png", "pdf"];
 
            const docType = documents.name.split('.').pop().toLowerCase();
            if (!supportedTypes.includes(docType)) {
                return res.status(400).json({
                    success: false,
                    message: "File type not supported for documents!",
                });
            }
        

        const logotype = logo.name.split('.').pop().toLowerCase();
        if (!supportedTypes.includes(logotype)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported for logo!",
            });
        }
        // Upload documents 
            const response = await uploadFile(documents, process.env.FOLDER_NAME || 'default_folder');
         
    

        // upload logo
        const logoresponse = await uploadFile(logo, process.env.FOLDER_NAME || 'default_folder');
       const logourl = logoresponse.url
        const uploadedDocumentsUrls = await response.url
         

        // Update client profile
        const updateClient = await Clintmodel.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    CompanyCode,
                    phoneNo,
                    address,
                    password:undefined,
                    isdocumentVerified: true,
                    isProfileComplete: true,
                    logo:logourl
                },
                $push: {
                    documents: uploadedDocumentsUrls,
                    
                }
            },
            { new: true }
        );
    const addNewspapername = await NewsPaperModel.findOne({NewsPaperName:updateClient.companyName})
    if(addNewspapername){
        res.status(400).json({
            success:false,
            message:"Newspaper already added"
        })
    }
    await NewsPaperModel.create({
        NewsPaperName:updateClient.companyName,
        newspaperLogo:logourl
    }) 
        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Profile created successfully!",
            updateClient
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const AddEmployee = async (req, res) => {
    try {
        const { empName, empMail, empPhoneNo, state, city, pincode, password, role, userId } = req.body;

        // Validate required fields
        if (!empName || !empMail || !empPhoneNo || !state || !city || !pincode || !password || !role || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
        
        // Validate proofId file
        if (!req.files || !req.files.proofId) {
            return res.status(400).json({
                success: false,
                message: "Please upload proof ID document!"
            });
        }
        const { proofId } = req.files;
        
        const supportedTypes = ["jpg", "jpeg", "png", "pdf"];
        const imageType = proofId.name.split('.').pop().toLowerCase();

        if (!supportedTypes.includes(imageType)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported for proof ID document!",
            });
        }

        // Upload proofId document
        let imageUrl;
        try {
            const Imageresponse = await uploadFile(proofId, process.env.FOLDER_NAME || 'default_folder');
            imageUrl = Imageresponse.url;
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload proof ID document!",
            });
        }

        // Check if the client exists
        const client = await Clintmodel.findById(userId);
        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Company not registered!"
            });
        }

        // Check if employee already exists
        const checkEmployee = await EmployeeModel.findOne({ empMail });
        if (checkEmployee) {
            return res.status(400).json({
                success: false,
                message: "Employee already added"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new employee
        const employee = await EmployeeModel.create({
            client: userId,
            empName,
            empCompany: client.companyName,
            empMail,
            empPhoneNo,
            state,
            city,
            pincode,
            password: hashedPassword,
            proofId: imageUrl,
            role,
            allLocalNewsCart: [],
            allAdNewsCart: [],
            employeeVerified: true
        });

        // Add employee to the client's employee list
        await Clintmodel.findByIdAndUpdate(
            userId,
            { $push: { employeeList: employee._id } },
            { new: true }
        );

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Employee added successfully!",
            employee
        });

    } catch (error) {
        console.error("Error adding employee:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const getClientDetails = async (req, res) => {
    try {
      // Extract userId from req.userId, set by authMiddleware
      const { userId } = req.body; // If you are setting it in req.userId, use req.userId
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID not provided"
        });
      }
  
      // Find client by userId
      const client = await Clintmodel.findById(userId).populate("employeeList").exec();
  
      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found"
        });
      }
  
      res.status(200).json({
        success: true,
        client
      });
    } catch (error) {
      console.error("Error in getting client details:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };





export {client_sendOtp,clinte_Login,verif_company_mail,clinte_signup,AddEmployee,getClientDetails}