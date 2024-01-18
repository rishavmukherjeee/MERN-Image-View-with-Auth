const cloudinary = require('cloudinary').v2;
const Image = require('../models/Image'); // Assuming you have an Image model

cloudinary.config({
    cloud_name: 'dkcgowfwq',
    api_key: '746926534893958',
    api_secret: '5q0_ozUMXhoF_OQlIMsNdP-7hBE',
  });


  const upload = async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload_stream({ resource_type: 'raw' }, async (error, result) => {
        if (error) throw new Error(error);
        const image = new Image({
          url: result.secure_url,
          views: 0
        });
        await image.save();
        res.json(image);
      }).end(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
  

// GET all images
const images= async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT add view to image
const view= async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.views += 1;
    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  upload,
  images,
  view
}