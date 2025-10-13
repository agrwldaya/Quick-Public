import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
     
    const authHeader = req.headers["authorization"];
    //console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1]; 
    //console.log(token)

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.body.userId = decoded.id;
    req.body.email = decoded.email;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or error in verification",
      error: error.message,
    });
  }
};
