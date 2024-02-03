import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import verifyToken from '../middlewares/auth.middleware';
import Hotel from '../models/hotel.model';
import { BookingType, PaymentIntentResponseType } from '../shared/types';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const router = express.Router();

router.post('/:hotelId/bookings/payment-intent', verifyToken, async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    try {
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(400).json({ message: 'Hotel not found!' });
        }
        const totalCost = hotel.pricePerNight * numberOfNights;
        //CREATES BILL INVOICE AND RETURNS SECRET TO PROCEED IN FRONTEND BILLING
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: "inr",
            metadata: {
                hotelId,
                userID: req.userID,
            },
            description: "This is dummy payment service! Do not use real cards",

        });


        //CHECKS IF INTENT CREATED CLIENT SECRET
        if (!paymentIntent.client_secret) {
            return res.status(500).json({ message: "Payment Failed!" })
        }

        const response: PaymentIntentResponseType = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            totalCost,
        };

        res.status(200).json(response);


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong!' })
    }
});


router.post('/:hotelId/bookings', verifyToken, async (req: Request, res: Response) => {

    try {
        //PAYMENT INVOICE ID
        const paymentIntentId = req.body.paymentIntentId;

        //FINDS PAYMENT INVOICE ASSCOIATED WITH THE ID
        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
        )

        if (!paymentIntent) {
            return res.status(400).json({ message: 'Payment Intent not found!' });

        }

        //EDGE CASE--> CHECKS IF HOTEL_ID AND USER_ID FROM USER BODY MATCHES PAYMENT INVOICE HOTEL_ID AND USER_ID
        if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userID !== req.userID) {
            return res.status(400).json({ message: 'Payment intent mismatch!' })
        }

        //EDGE CASE--> MAKES SURE PAYMENT INVOICE IS CREATED SUCCESSFULLY
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: `'Payment intent failed!'Status: ${paymentIntent.status}` });
        }

        const newBooking: BookingType = {
            ...req.body,
            userID: req.userID,
        }

        //UPDATES HOTEL INFO WITH BOOKING IT HAS
        const hotel = await Hotel.findOneAndUpdate({ _id: req.params.hotelId }, {
            $push: { bookings: newBooking },
        });

        if (!hotel) {
            return res.status(400).json({ message: "Hotel not found!" })
        }

        await hotel.save();
        res.status(200).json(hotel);



    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
})

export default router;