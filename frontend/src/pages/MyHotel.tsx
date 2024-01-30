import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as hotelsApiClient from '../api/hotels.api';
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";


const MyHotels = () => {
    const { showToast } = useAppContext();

    const { data: hotelData } = useQuery("getMyHotels", hotelsApiClient.getHotels, {
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" });
        }
    })

    if (!hotelData) {
        return <span>No Hotels Found!</span>
    }

    return (<>
        <div className="container space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link to="/add-hotel" className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-full px-8'>
                    Create Hotel
                </Link>
            </span>
            <div className="grid grid-col-1 gap-8">
                {hotelData.map((hotel, index) => {
                    return (
                        <div key={hotel._id + "_" + index} className="flex flex-col justify-between bg-purple-100 rounded-md p-5">
                            <h3 className="text-xl font-bold mb-4">{hotel.name}</h3>
                            <p className="text-sm whitespace-pre-line mb-3 w-4/6">{hotel.description}</p>
                            <div className="grid grid-cols-5 gap-2 mb-4">
                                <div className="bg-purple-200 rounded-md p-2 flex items-center">
                                    <BsMap className="mr-1" />
                                    {hotel.city}, {hotel.country}
                                </div>
                                <div className="bg-purple-200 rounded-md p-2 flex items-center">
                                    <BsBuilding className="mr-1" />
                                    {hotel.type}
                                </div>
                                <div className="bg-purple-200 rounded-md p-2 flex items-center">
                                    <BiMoney className="mr-1" />
                                    &#8377; {hotel.pricePerNight} per night
                                </div>
                                <div className="bg-purple-200 rounded-md p-2 flex items-center">
                                    <BiHotel className="mr-1" />
                                    {hotel.adultCount} adults, {hotel.childrenCount} children
                                </div>
                                <div className="bg-purple-200 rounded-md p-2 flex items-center">
                                    <BiStar className="mr-1" />
                                    {hotel.starRating}
                                </div>
                            </div>
                            <span className="flex justify-end">
                                <Link to={`/edit-hotel/${hotel._id}`} className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-full px-8'>
                                    Edit Hotel
                                </Link>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
}

export default MyHotels;