import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();

const memory_Storage = multer.memoryStorage();

const upload = multer({
    storage: memory_Storage,
    limits: {
        fileSize: 5 * 1024 * 1024  //5MB
    }
})

//upload.array("hotelImages", 6) RECIEVE IMAGE ARRAY WITH MAX LIMIT OF 6 IMAGES

router.post('/', upload.array("hotelImages", 6), async (req: Request, res: Response) => {

    const newhotel = req.body.newhotel;
})