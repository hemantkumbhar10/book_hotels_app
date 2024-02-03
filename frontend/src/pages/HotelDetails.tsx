import { useParams } from "react-router-dom";
import * as hotelApiClient from '../api/hotel.api';
import { useQuery } from "react-query";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";


const HotelDetails = () => {

    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchHotelById", () =>
        hotelApiClient.fetchHotelById(hotelId as string),
        {
            //SOMETIMES PARAMS ARE NOT QUICKLY FETCHED AS SOON AS PAGE RENDERS 
            //HENCE THIS DISABLES QUERY IF HOTEL_ID IS UNDEFINED
            enabled: !!hotelId,
        })

    if (!hotel) {
        return <p className="container text-2xl uppercase text-purple-800">No Hotel found!</p>
    }

    return (<>
        <div className="container space-y-6">
            <div>
                <span className="flex">
                    {Array.from({ length: hotel?.starRating as number }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((image) => (
                    <div className="h-[300px]">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="rounded-lg w-full h-full object-cover object-center"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotel.facilities.map((facility) => (
                    <div className="p-3 rounded-full bg-purple-200 text-md text-center">{facility}</div>
                ))}
            </div>
            <div className="grid gird-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
                </div>
            </div>
        </div>
    </>)
}

export default HotelDetails;