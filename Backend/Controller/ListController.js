const User = require("../model/User");

const players = async (req,res)=>{
    try {
     const keyword = req.query.search
     ? {
       $or : [
         {name : {$regex : req.query.search , $options: "i"}},
         {email : {$regex : req.query.search , $options: "i"}}
       ]
     }:{};
   
     const players = await User.find(keyword);
     if(players.length === 0){
       return res.status(404).json({ message: "No Player found." });
     }
     else{
       res.status(200).json(players);
     }
    } catch (error) {
     console.log("Error: ", error);
           res.status(500).json(error);
    }
   }
  
 module.exports = {players}  