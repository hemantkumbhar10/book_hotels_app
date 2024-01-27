import express, { Request, Response } from 'express';
import { upload, uploadMultipleImages } from '../middlewares/cloudinary.middleware';
import Hotel, { HotelType } from '../models/hotel.model';
import verifyToken from '../middlewares/auth.middleware';
import { body } from 'express-validator';

const router = express.Router();



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

    //CONTROLER
    async (req: Request, res: Response) => {

        try {
            const hotelImages = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            //UPLOADING IMAGES TO CLOUDINARY AND GETTING ARRAY OF URLS
            const images = await uploadMultipleImages(hotelImages);
            newHotel.imageUrls = images;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userID;

            const hotel = new Hotel(newHotel);
            await hotel.save();
            res.status(201).send(hotel);

        } catch (error) {
            console.log("Error while creating hotel!", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
);

export default router;