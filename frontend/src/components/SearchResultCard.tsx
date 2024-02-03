import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";




type Props = {
    hotel: HotelType;
}

const SearchResultCard = ({ hotel }: Props) => {
    return <>
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_4fr] border border-purple-300 rounded-xl p-8 gap-8">
            <div className="w-full h-[300px]">
                <img
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center rounded-sm"
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div className="">
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-1 text-sm italic">{hotel.type}</span>
                    </div>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        {hotel.name}
                    </Link>
                </div>
                <div className="">
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>
                <div className="grid gap-y-5 md:gap-y-0 grid-rows md:grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 3).map((facility, index) => (
                            <span className="bg-purple-200 p-2 
                                    rounded-full font-bold text-xs whitespace-nowrap"
                                key={facility + '_' + index}
                            >
                                {facility}
                            </span>
                        ))}
                        <span
                            className="text-sm text-slate-500"
                        >
                            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more..`}
                        </span>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-1">
                        <span className="font bold">&#8377; {hotel.pricePerNight} per night</span>
                        <Link to={`/detail/${hotel._id}`} className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8'>
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default SearchResultCard;