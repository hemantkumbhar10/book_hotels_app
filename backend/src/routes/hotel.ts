import express, { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import Hotel from '../models/hotel.model';


const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({}).sort("-lastUpdated");

        res.status(200).json(hotels);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' })
    }
})


router.get('/:id',
    [param("id").notEmpty().withMessage("Hotel ID is required!")],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const hotelId = req.params.id.toString();


        try {
            const hotel = await Hotel.findById(hotelId);
            res.status(200).json(hotel);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong!" })
        }
    });


export default router;