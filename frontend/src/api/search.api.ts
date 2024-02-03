import { HotelSearchResponse } from '../../../backend/src/shared/types';


const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL || "";


export type SearchParams = {
    destination?: string;
    adultCount?: string;
    childCount?: string;
    checkIn?: string;
    checkOut?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string
}


export const searchHotels = async (searchData: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();

    queryParams.append("destination", searchData.destination || "");
    queryParams.append("adultCount", searchData.adultCount || "");
    queryParams.append("childCount", searchData.childCount || "");
    queryParams.append("checkIn", searchData.checkIn || "");
    queryParams.append("checkOut", searchData.checkOut || "");
    queryParams.append("page", searchData.page || "");

    queryParams.append('maxPrice', searchData.maxPrice || "");
    queryParams.append('sortOption', searchData.sortOption || "");

    searchData.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );

    searchData.types?.forEach((type) => queryParams.append("types", type));
    searchData.stars?.forEach((star) => queryParams.append("stars", star));


    const response = await fetch(`${BASE_BACKEND_API_URL}/api/hotels/search?${queryParams}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Couldnt search hotels!');
    }

    return response.json();
}