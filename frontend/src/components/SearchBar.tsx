import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


const SearchBox = () => {

    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const navigate = useNavigate();

    const submitSearchHandler = (e: FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    };

   

    

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return <>
        <form onSubmit={submitSearchHandler}
            className="-mt-8 p-3 shadow-md grid grid-cols-2 
                        lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4
                        2x:grid-cols-5 bg-purple-400 rounded-xl backdrop-blur-sm ">
            <div className="flex flex-row items-center flex-1 bg-white p-2
                            bg-white-300 opacity-95 rounded-xl
                            shadow-inner backdrop-blur-sm ">
                <MdTravelExplore size={25} className="mr-2" />
                <input type="text"
                    placeholder="Search the best!"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className="w-auto flex flex-row items-center flex-1 bg-white p-2
                            bg-white-300 opacity-95 rounded-xl
                            shadow-inner backdrop-blur-sm ">
                <label className="items-center flex">
                    Adults:
                    <input type="number"
                        className="w-full focus:outline-none font-bold"
                        min={1} max={20} value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    />
                </label>
                <label className="items-center flex">
                    Children:
                    <input type="number"
                        className="w-full focus:outline-none font-bold"
                        min={0} max={20} value={childCount}
                        onChange={(event) => setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>
            <div className="w-auto flex flex-row items-center flex-1 bg-white px-2
                            bg-white-300 opacity-95 rounded-xl
                            shadow-inner backdrop-blur-sm">
                <DatePicker selected={checkIn}
                    calendarClassName="bg-gray-100 rounded-xl border-none"
                    wrapperClassName="min-w-full"
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full bg-white p-2 focus:outline-none "
                />
            </div>
            <div className="w-auto flex flex-row items-center flex-1 bg-white px-2
                            bg-white-300 opacity-95 rounded-xl
                            shadow-inner backdrop-blur-sm">
                <DatePicker selected={checkOut}
                    calendarClassName="bg-gray-100 rounded-xl border-none"
                    wrapperClassName="min-w-full"
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full bg-white p-2 focus:outline-none "
                />
            </div>
            <div className="flex gap-1">
                <button type='submit' className='text-sm bg-green-500 text-white p-2 font-bold hover:bg-green-400 rounded-md px-8'>
                    Search
                </button>
                <button type='submit' className='text-sm bg-red-500 text-white p-2 font-bold hover:bg-red-400 rounded-md px-8'>
                    Clear
                </button>
            </div>
        </form>
    </>
}

export default SearchBox;