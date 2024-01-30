import express, { Request, Response } from 'express';
import { uploadMultipleImages } from '../middlewares/cloudinary.middleware';
import Hotel from '../models/hotel.model';
import { HotelType } from '../shared/types';
import verifyToken from '../middlewares/auth.middleware';
import { body } from 'express-validator';
import multer from 'multer';

const router = express.Router();

const memory_Storage = multer.memoryStorage();

export const upload = multer({
    storage: memory_Storage,
    limits: {
        fileSize: 5 * 1024 * 1024  //5MB
    }
})

//upload.array("hotelImages", 6) RECIEVE IMAGE ARRAY WITH MAX LIMIT OF 6 IMAGES

router.post(
    '/',
    verifyToken,

    //VALIDATES BODY REQUEST
    [
        body("name").notEmpty().withMessage('Name is required!'),
        body("city").notEmpty().withMessage('City is required!'),
        body("country").notEmpty().withMessage('Country is required!'),
        body("description").notEmpty().withMessage('Description is required!'),
        body("type").notEmpty().withMessage('Hotel Type is required!'),
        body("adultCount").notEmpty().isNumeric().withMessage('Adult Count is required and must be number!'),
        body("childrenCount").notEmpty().isNumeric().withMessage('Children Count is required and must be number!'),
        body("facilities").notEmpty().isArray().withMessage('Facilities is required and must be list!'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('Price Per Night is required and must be number!'),
        body("starRating").notEmpty().isNumeric().withMessage('Star Rating is required and must be number!'),
    ],

    //UPLOAD IMAGES TO MEMORY_STORAGE FIRST
    upload.array("hotelImages", 6),
    //6.49.39

    //CONTROLER
    async (req: Request, res: Response) => {
        try {
            const hotelImages = req.files as Express.Multer.File[];

            const newHotel: HotelType = req.body;
            //UPLOADING IMAGES TO CLOUDINARY AND GETTING ARRAY OF URLS
            const imageUrls = await uploadMultipleImages(hotelImages);
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userID = req.userID;

            const hotel = new Hotel(newHotel);
            await hotel.save();
            res.status(201).send(hotel);

        } catch (error) {
            console.log("Error while creating hotel!", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
);

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userID: req.userID });
        res.status(200).json(hotels);
    } catch (e) {
        res.status(500).json({ message: "Error fetching hotels!" });
    }
})

export default router;

router.get('/:id', verifyToken, async (req: Request, res: Response) => {

    const hotelId = req.params.id.toString();

    try {
        const hotel = await Hotel.findOne({ _id: hotelId, userID: req.userID });

        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching hotel!" })
    }
})