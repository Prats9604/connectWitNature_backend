import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Register Route
router.post('/register', async(req, res)=>{
  const {name, email, password, confirmPassword}=req.body;

  if(password!==confirmPassword){
    return res.status(400).json({message:'Password do not match'});
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password:hashedPassword});
    await newUser.save();

    res.status(201).json({message:'User registered Successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'});
  }
})

//Login Route
router.post('/login', async(req, res)=>{
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'User not found'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message:'Invalid Credentials (Password)'});
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET!, {expiresIn:'10h'});
    res.json({token : token , userId : user._id});
    } catch (error) {
      res.status(500).json({message: 'Server error'});
  }
});


//Token check
router.post('/requireauth', async(req, res)=>{
   const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, "secret");

      res.json({
        auth: true,
        data: decode,
      });
    } catch (error:any) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
});




export default router;
