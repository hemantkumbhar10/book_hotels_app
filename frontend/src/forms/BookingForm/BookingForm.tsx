import { useForm } from "react-hook-form";
import { PaymentIntentResponseType, UserType } from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as bookingApiClient from '../../api/payment.api';
import { useAppContext } from "../../contexts/AppContext";

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponseType
}

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    hotelId: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    paymentIntentId: string;
    totalCost: number;
}


const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    const search = useSearchContext();
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { mutate: bookRoom, isLoading } = useMutation(bookingApiClient.createBooking, {
        onSuccess: () => {
            showToast({ message: 'Congratulations! You got the keys!', type: 'SUCCESS' });
        },
        onError: () => {
            showToast({ message: "Something went wrong", type: 'ERROR' });
        }
    })

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstname,
            lastName: currentUser.lastname,
            email: currentUser.email,
            childCount: search.childCount,
            adultCount: search.adultCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        }
    });


    const paymentSubmitHandler = async (formData: BookingFormData) => {

        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                    address: {
                        line1: '510 Townsend St',
                        postal_code: '98140',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                    },
                }
            }
        });

        if (result.paymentIntent?.status === 'succeeded') {
            //BOOK THE HOTEL ROOM
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
        }


    }

    return (<>
        <form onSubmit={handleSubmit(paymentSubmitHandler)} className="grid grid-cols-1 gap-5 rounded-lg border border-purple-300 p-5">
            <span className="text-2xl font-bold">Confirm Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        type="text"
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        readOnly
                        disabled
                        {...register("firstName")}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        type="text"
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        readOnly
                        disabled
                        {...register("lastName")}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        type="text"
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Billing Invoice</h2>
                <div className="bg-purple-200 p-4 rounded-lg">
                    <div className="font-semibold text-lg">
                        Total Bill: &#8377; {paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-xs">Including taxes and charges</div>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                    Payment Details
                </h3>
                <CardElement id="payment-element" className="border rounded-lg p-2 text-sm" />
            </div>
            <div className="flex flex-end">
                <button
                    disabled={!isLoading}
                    type='submit'
                    className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8 disabled:bg-gray-400'
                >
                    {!isLoading ? "Confirm Payment" : "Booking Room.."}
                </button>
            </div>
        </form>
    </>)
}

export default BookingForm;