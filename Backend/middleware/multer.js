import multer from "multer";
import fs from "fs";
import path from "path";

export const uploadWithDestination = (arrayFieldName, maxCount) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const resolvedPath = path.resolve("../uploads/");
            cb(null, resolvedPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    });

    const upload = multer({ storage }).array(arrayFieldName, maxCount);
  
    return (req, res, next) => {
        upload(req, res, (err) => {
             
            if (err instanceof multer.MulterError) {
                cleanupUploadedFiles(req.files);
                return res.status(400).send('Error uploading files: ' + err.message);
            } else if (err) {
                cleanupUploadedFiles(req.files);
                return res.status(500).send('Error uploading files: ' + err);
            }
            next();
        });
    };
};

const cleanupUploadedFiles = (files) => {
    if (files && Array.isArray(files)) {
        files.forEach(file => {
            if (file && file.path) {
                fs.unlink(file.path, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting file:', unlinkErr);
                    }
                });
            }
        });
    }
};
