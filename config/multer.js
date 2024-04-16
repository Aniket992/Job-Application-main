import multer from 'multer';

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Set filename with a unique prefix
  }
});

// Create multer instance with configured storage
const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
