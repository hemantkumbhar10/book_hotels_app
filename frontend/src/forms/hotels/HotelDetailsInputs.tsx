import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./HotelForm";

const HotelDetailsInputs = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (<>
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add New Hotel</h1>
            <label className='text-gray-700 text-sm font-bold'>
                Hotel Name
                <input className='border rounded w-full py-1 px-2 font-normal'
                    type='text'
                    {...register("name", { required: "Hotel Name is required!" })}
                />
                {errors.name && (
                    <span className='text-red-500 text-xs'>{errors.name?.message}</span>
                )}
            </label>


            <div className="flex flex-col gap-4 md:flex-row">
                <label className='text-gray-700 text-sm font-bold'>
                    City
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type='text'
                        {...register("city", { required: "City Name is required!" })}
                    />
                    {errors.city && (
                        <span className='text-red-500 text-xs'>{errors.city?.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold'>
                    Country
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type='text'
                        {...register("country", { required: "Country Name is required!" })}
                    />
                    {errors.country && (
                        <span className='text-red-500 text-xs'>{errors.country?.message}</span>
                    )}
                </label>
            </div>

            <label className='text-gray-700 text-sm font-bold'>
                Description
                <textarea className='border rounded w-full py-1 px-2 font-normal'
                    {...register("description", { required: "Description is required!" })}
                    rows={10}
                />
                {errors.description && (
                    <span className='text-red-500 text-xs'>{errors.description?.message}</span>
                )}
            </label>


            <div className="flex flex-col gap-4 md:flex-row">
                <label className='text-gray-700 text-sm font-bold w-full'>
                    Price/Night
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type="number"
                        {...register("pricePerNight", { required: "Price is required!" })}
                        min={1}

                    />
                    {errors.pricePerNight && (
                        <span className='text-red-500 text-xs'>{errors.pricePerNight?.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold w-full'>
                    Ratings
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type="number"
                        {...register("starRating", { required: "Rating is required!" })}
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={1}
                    />
                    {errors.starRating && (
                        <span className='text-red-500 text-xs'>{errors.starRating?.message}</span>
                    )}
                </label>
            </div>
        </div>

    </>);
};

export default HotelDetailsInputs;