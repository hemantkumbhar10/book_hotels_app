import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types"

type Props = {
    hotel: HotelType;
}

const LatestHotelCard = ({ hotel }: Props) => {

    return (<>
        <Link to={`/detail/${hotel._id}`}
            className="relative cursor-pointer overflow-hidden rounded-lg">
            <div className="h-[300px]">
                <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute bottom-0 p-4 bg-purple bg-opacity-50 w-full rounded-b-lg">
                <span className="text-white font-bold tracking-tight text-3xl">{hotel.name}</span>
            </div>
        </Link>
    </>)
}

export default LatestHotelCard;