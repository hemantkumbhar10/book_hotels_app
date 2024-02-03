import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {

    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });


    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate('/sign-in', {
            state: { from: location }
        })
    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`, {
            state: { from: location }
        })
    }


    return (<>
        <div className="flex flex-col p-4 gap-4 bg-purple-300 rounded-lg">
            <h3 className="text-md font-bold"> &#8377; {pricePerNight}</h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            calendarClassName="bg-gray-100 rounded-xl border-none"
                            wrapperClassName="min-w-full"
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none rounded-md"
                        />
                    </div>
                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            calendarClassName="bg-gray-100 rounded-xl border-none"
                            wrapperClassName="min-w-full"
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full bg-white p-2 focus:outline-none rounded-md"
                        />
                    </div>
                    <div className="w-auto flex flex-row items-center flex-1 bg-white p-2
                            bg-white-300 rounded-xl justify-between">
                        <label className="items-center flex">
                            Adults:
                            <input type="number"
                                className="w-full focus:outline-none font-bold"
                                min={1} max={20} {...register("adultCount", {
                                    required: "This field is required!",
                                    min: {
                                        value: 1,
                                        message: "Atleast 1 adult is required!"
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="items-center flex">
                            Children:
                            <input type="number"
                                className="w-full focus:outline-none font-bold"
                                min={0} max={20}
                                {...register('childCount', {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    {
                        isLoggedIn ? (
                            <button type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8'>
                                Book Now
                            </button>
                        ) :
                            (
                                <button type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8'>
                                    Log In & Book
                                </button>
                            )
                    }
                </div>
            </form>
        </div>

    </>)
}

export default GuestInfoForm;