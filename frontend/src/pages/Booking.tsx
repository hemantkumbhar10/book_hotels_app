import { useQuery } from 'react-query';
import * as userApiClient from '../api/user.api';
import * as hotelApiClient from '../api/hotel.api';
import * as paymentApiClient from '../api/payment.api';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingSummary from '../components/BookingSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
    const search = useSearchContext();
    const { hotelId } = useParams();
    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    const { stripePromise } = useAppContext();

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = 
            Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights) + 1);
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData } = useQuery("createPaymentIntent",
        () => paymentApiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
        {
            enabled: !!hotelId && numberOfNights > 0,
        })

    const { data: hotel } = useQuery("fetchHotelById", () => hotelApiClient.fetchHotelById(hotelId as string), {
        enabled: !!hotelId,
    });

    const { data: currentUser } = useQuery("getCurrentUser", userApiClient.getCurrentUser);

    if (!hotel) {
        return <p className='container text-2xl font-bold text-purple-500'>NO HOTEL FOUND!</p>
    }

    return (<>
        <div className="container grid md:grid-cols-[1fr_2fr] gap-4">
            <BookingSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />
            {currentUser && paymentIntentData && (

                //STRIPE PROVIDER
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: paymentIntentData.clientSecret,
                        
                    }}
                    key={paymentIntentData.clientSecret}
                >
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
                </Elements>
            )}

        </div>
    </>)
}

export default Booking;