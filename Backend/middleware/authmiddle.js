import jwt from "jsonwebtoken";
 

export const authMiddleware = async (req, res, next) => {
  
  try {
     
    let {token} = req.headers;
     

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or error in verification",
      error: error.message
    });
  }
};

 