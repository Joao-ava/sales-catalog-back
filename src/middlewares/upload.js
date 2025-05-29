import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadPath } from '../config/path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = uploadPath;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;