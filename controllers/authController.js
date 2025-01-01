const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } 
  );
};

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user", 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } 
      );
  
      
      res.cookie("token", token, { httpOnly: true });
  
     
      res.redirect("/tasks"); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};
