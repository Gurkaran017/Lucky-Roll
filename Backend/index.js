const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./model/User");
const bcryptjs = require("bcryptjs");
const Login = require("./Route/Login");
const SignUp = require("./Route/SignUp");
const ChangeScore = require("./Route/ChangeScore");
const Players = require("./Route/Player");
const path = require('path');


// app.use(cors({
//   credentials:true,
//   origin:"http://localhost:5173"
//   }))

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3001;

const _dirname = path.resolve();

// app.use(cors());
app.use(cors({
  credentials:true,
  origin:"https://lucky-roll.onrender.com"
  }))
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello working");
// });

// router.post("/login",Login);
app.use("/api/login",Login);
app.use("/api/signup",SignUp)
app.use("/api/changeScore",ChangeScore)
app.use("/api/Players",Players)

// app.get("/api/Players" , async (req,res)=>{
//  try {
//   const keyword = req.query.search
//   ? {
//     $or : [
//       {name : {$regex : req.query.search , $options: "i"}},
//       {email : {$regex : req.query.search , $options: "i"}}
//     ]
//   }:{};

//   const players = await User.find(keyword);
//   if(players.length === 0){
//     return res.status(404).json({ message: "No Player found." });
//   }
//   else{
//     res.status(200).json(players);
//   }
//  } catch (error) {
//   console.log("Error: ", error);
//         res.status(500).json(error);
//  }
// })


// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required." });
//   }

//   const findUser = await User.findOne({ email });

//   console.log("Email:", email);
//   console.log("Password:", password);

//   try {
//     const PasswordMatch = await bcryptjs.compare(password , findUser.password)

//   if (!findUser || !PasswordMatch) {
//     console.log("Invalid username or password");
//     return res.status(401).json({ message: "Invalid username or password" });
//   } else {
//     console.log("Login Successful");
//     res.status(200).json({  // Use 200 for successful login
//       message: "Login Successful",
//       user: {
//         _id: findUser._id,
//         name: findUser.name,
//         email: findUser.email,
//         highestScore : findUser.highestScore
//       },
//     });
//   }
//   } catch (error) {
//     console.log("Invalid username or password");
//     return res.status(401).json({ message: "Invalid username or password" });
//   }
// });

// app.post("/api/signup", async (req, res) => {
//     const { email, name, password } = req.body;
//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "Fields are required." }); // Change "error" to "message"
//     }
//     const userExists = await User.findOne({ email });
  
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" }); // Change "error" to "message"
//     }
//     const hashedPassword = await bcryptjs.hash(password,10)
//     const user = await User.create({
//       name,
//       email,
//       password : hashedPassword,
//     });
  
//     res.status(201).json({
//       message: "Signup Successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         highestScore : user.highestScore
//       },
//     });
//   });

  // app.post("/api/changeScore", async (req, res) => {
  //   const { email, highScore } = req.body;
  
  //   if (!email || highScore === undefined) {
  //     return res.status(400).json({ message: "Missing email or highScore" });
  //   }
  
  //   try {
  //     const ss = await User.findOne({email});
  //     if(highScore>ss.highestScore){
  //       const user = await User.findOneAndUpdate(
  //         { email },
  //         { highestScore: highScore },
  //         { new: true, upsert: true }
  //       );
  //       res.status(200).json({ highestScore: user.highestScore });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Error updating score", error });
  //   }
  // });
  

app.use(express.static(path.join(_dirname, "/Frontend/dist")))
app.get("*" , (_,res) => {
  res.sendFile(path.resolve(_dirname, "Frontend" , "dist" , "index.html"));
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
