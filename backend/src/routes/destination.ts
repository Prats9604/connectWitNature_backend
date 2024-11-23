//routes/destinations
const express = require('express');
const router = express.Router();
const { storage } = require("../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
import Destination from '../models/Destination';

router.post("/destinations/", upload.array("images", 10), async (req: any, res: any) => {
  try {
    // Extract the array of image paths
    const imagePaths = req.files.map((file: any) => file.path);
    
    const { name, description, contributor } = req.body;
    console.log("imagePaths==", imagePaths);
    console.log("name==", name);
    console.log("description==", description);

    // Create a new destination with multiple image paths
    const newPost = new Destination({
      name,
      description,
      src: imagePaths, // Store the array of image URLs
      contributor
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// API to get all destinations
router.get("/destinations", async (req:any, res:any) => {
  try {
    const allDestinations = await Destination.find();
    res.json(allDestinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;