const User = require("../model/User");
const bcryptjs = require("bcryptjs");

const ScoreChange = async (req, res) => {
    const { email, highScore } = req.body;
  
    if (!email || highScore === undefined) {
      return res.status(400).json({ message: "Missing email or highScore" });
    }
  
    try {
      const ss = await User.findOne({email});
      if(highScore>ss.highestScore){
        const user = await User.findOneAndUpdate(
          { email },
          { highestScore: highScore },
          { new: true, upsert: true }
        );
        res.status(200).json({ highestScore: user.highestScore });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating score", error });
    }
};

module.exports = {ScoreChange}