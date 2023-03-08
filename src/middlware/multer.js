import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req,file,cb) => {
        //cb(null, file.originalname)
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req,file,cb) => {
        const filetypes = /jpeg|jpg|png/
        const minetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (minetype && extname) {
            return cb(null, true)
        }
        cb("Error: Archivo no soportado") 
    }
}).single('image')