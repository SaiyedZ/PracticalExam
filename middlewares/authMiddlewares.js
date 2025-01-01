const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.redirect("/auth/login"); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    res.locals.role = decoded.role; 
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.clearCookie("token"); 
    res.redirect("/auth/login");
  }
};
