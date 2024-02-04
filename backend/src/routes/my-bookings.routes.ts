import express, { Request, Response } from 'express';
import verifyToken from '../middlewares/auth.middleware';
import Hotel from '../models/hotel.model';
import { HotelType } from '../shared/types';


const router = express.Router();

//api/my-bookings
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: {
                $elemMatch: {
                    userID: req.userID
                }
            }
        });

        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userID === req.userID
            );

            const hotelWithUserBooking: HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            };

            return hotelWithUserBooking;
        });

        res.status(200).json(results);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

export default router;