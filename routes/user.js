const express = require("express");
const router = express.Router();
const Image = require('../models/Image'); // Assuming you have an Image model
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'dkcgowfwq',
    api_key: '746926534893958',
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const { login, register, dashboard, getAllUsers } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')
const {upload,images,view } = require("../controllers/image");
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);

router.route("/images").get(images);
router.route("/images/:id").put(view);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'some_folder_name',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.originalname
    },
  });
  
  const parser = multer({ storage: storage });
  
  router.post('/images', parser.single('image'), async (req, res) => {
    try {
      const image = new Image({
        url: req.file.path,
        views: 0
      });
      await image.save();
      res.json(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;