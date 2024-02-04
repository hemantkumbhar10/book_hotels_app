import { useQuery } from 'react-query';
import * as hotelApiClient from '../api/hotel.api';
import LatestHotelCard from '../components/LatestHotelCard';




const Home = () => {
    const { data: hotels } = useQuery("fetchQuery", () => hotelApiClient.getHomePageHotels());

    const topHotels = hotels?.slice(0, 2) || [];
    const bottomHotels = hotels?.slice(2) || [];


    return (<>
        <div className="container space-y-3">
            <h2 className='text-3xl font-bold'>Latest Additions</h2>
            <p>Recently added hotels just for you</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {
                        topHotels.map((hotel) => (
                            <LatestHotelCard hotel={hotel} />
                        ))
                    }
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {
                        bottomHotels.map((hotel) => (
                            <LatestHotelCard hotel={hotel} />
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Home;