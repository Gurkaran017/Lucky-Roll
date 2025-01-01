const User = require("../model/User");
const bcryptjs = require("bcryptjs");

const authUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
  
    const findUser = await User.findOne({ email });
  
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      const PasswordMatch = await bcryptjs.compare(password , findUser.password)
  
    if (!findUser || !PasswordMatch) {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    } else {
      console.log("Login Successful");
      res.status(200).json({  // Use 200 for successful login
        message: "Login Successful",
        user: {
          _id: findUser._id,
          name: findUser.name,
          email: findUser.email,
          highestScore : findUser.highestScore
        },
      });
    }
    } catch (error) {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    }
};

const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Fields are required." }); // Change "error" to "message"
    }
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: "User already exists" }); // Change "error" to "message"
    }
    const hashedPassword = await bcryptjs.hash(password,10)
    const user = await User.create({
      name,
      email,
      password : hashedPassword,
    });
  
    res.status(201).json({
      message: "Signup Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        highestScore : user.highestScore
      },
    });
  };

module.exports = {authUser , registerUser}