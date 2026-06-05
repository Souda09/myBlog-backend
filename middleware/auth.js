import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Try to get token from cookie first
    let token = req.cookies.token;
    
    // ✅ If not in cookie, try Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - No token provided' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized - Invalid token' 
    });
  }
};