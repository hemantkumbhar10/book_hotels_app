import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as searchApiClient from '../api/search.api';
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "./Pagination";
import StarRatingFilter from "../components/filters/StarRatingFilter";
import HotelTypesFilter from "../components/filters/HotelTypesFilter";
import FacilitiesFilter from "../components/filters/FacilitiesFilter";
import PriceFilter from "../components/filters/PriceFIlter";
import SortFilters from "../components/filters/SortFilters";


const Search = () => {

    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");
    const searchParams = {
        destination: search.destination,
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedTypes,
        facilities: selectedFacility,
        maxPrice: maxPrice?.toString(),
        sortOption,

    }

    const { data: hotelData } = useQuery(['searchHotels', searchParams],
        () => searchApiClient.searchHotels(searchParams)
    );

    //FILTER BY STARS
    const starsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        //CHECKED CURRENT BOX
        const starRating = event.target.value;
        event.target.checked ? console.log("CHECKED BOX") : console.log("NOT CHECKED");
        //SETS STARS ONLY IF THEY ARE CHECKED AND REMOVES/FILTERS OUT UNCHECKED
        setSelectedStars((prevStars) =>
            //IF CHECKED GET PREVIOUS AND CURRENT STARS AND PUSH TO STATE
            event.target.checked ? [...prevStars, starRating]
                //IF CLICKED AGAIN ON CHECKED BOX MEANS UNCHECKED
                //THEN FILTER THAT UNCHECKED STAR FROM STARS[]
                : prevStars.filter((star) => star !== starRating));
    }

    //FILTER BY HOTEL TYPES
    const hotelTypesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedTypes((prevTypes) =>
            event.target.checked ? [...prevTypes, hotelType]
                : prevTypes.filter((type) => type !== hotelType));
    }

    //FILTER BY HOTEL Facility
    const hotelFacilityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelFacility = event.target.value;
        setSelectedFacility((prevFacility) =>
            event.target.checked ? [...prevFacility, hotelFacility]
                : prevFacility.filter((facility) => facility !== hotelFacility));
    }


    return (<>
        <div className="container grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-xl border border-purple-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semifold border-b border-purple-300 pb-5">Filter by:</h3>
                    {/* TODO FILTERS */}
                    <StarRatingFilter selectedStars={selectedStars} onChange={starsChangeHandler} />
                    <HotelTypesFilter selectedTypes={selectedTypes} onChange={hotelTypesChangeHandler} />
                    <FacilitiesFilter selectedFacilities={selectedFacility} onChange={hotelFacilityChangeHandler} />
                    <PriceFilter selectedPrice={maxPrice} onChange={(value?: number) => setMaxPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-600 italic">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination[0].toUpperCase() + search.destination.slice(1)}` : ''}
                    </span>
                    <SortFilters sortOption={sortOption} onChange={(value: string) => setSortOption(value)} />
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}
                <div className="">
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    </>)
}

export default Search;