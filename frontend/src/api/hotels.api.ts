import { HotelType } from '../../../backend/src/shared/types';


const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL || "";


export const createNewHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/myhotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to create hotel!");
    }

    return response.json();
}

export const getHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/myhotels`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error("Error getting hotels!")
    }

    return response.json();
}

export const getHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/myhotels/${hotelId}`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Error getting hotel!")
    }
    return response.json();
}

export const updateHotelById = async (hotelFormData: FormData): Promise<HotelType> => {
    const hotelId = hotelFormData.get('hotelId');
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/myhotels/${hotelId}`, {
        method: 'PUT',
        credentials: 'include',
        body: hotelFormData,
    })
    if (!response.ok) {
        throw new Error("Failed to update hotel!");
    }

    return response.json();
}