import { HotelType } from '../../../backend/src/shared/types';


const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL || "";


export const getHomePageHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/hotel/`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error("COuld not get Hotels!")
    }

    return response.json();
}


export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/hotel/${hotelId}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error("Could not get Hotel!");
    }

    return response.json();
}