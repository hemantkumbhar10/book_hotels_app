import { PaymentIntentResponseType } from "../../../backend/src/shared/types";
import { BookingFormData } from "../forms/BookingForm/BookingForm";



const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL || "";

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponseType> => {

    const response = await fetch(`${BASE_BACKEND_API_URL}/api/reservations/${hotelId}/bookings/payment-intent`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ numberOfNights }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error("Payment Intent Failed!")
    }

    return response.json();
};


export const createBooking = async (formData: BookingFormData) => {

    const response = await fetch(`${BASE_BACKEND_API_URL}/api/reservations/${formData.hotelId}/bookings`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Booking failed!');
    }

    return response.json();
}