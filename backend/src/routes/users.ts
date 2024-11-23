import express from "express";
import User, { IUser } from "../models/User";

const router= express.Router();

//Get All Users
router.get('/', async (req, res) => {
    try {
        const users: IUser[] = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});


//Get  Users by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
export default router;