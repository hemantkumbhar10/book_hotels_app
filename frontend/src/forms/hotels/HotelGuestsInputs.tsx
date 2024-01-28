import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./HotelForm";


const HotelGuestsInputs = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (<>
        <div >
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="flex flex-col gap-4 md:flex-row bg-purple-200 items-center justify-center px-5 py-5 rounded-md">
                <label className='text-gray-700 text-sm font-bold w-full'>
                    Adults
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type="number"
                        {...register("adultCount", { required: "Adult count is required!" })}
                        min={1}

                    />
                    {errors.adultCount && (
                        <span className='text-red-500 text-xs'>{errors.adultCount?.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold w-full'>
                    Childrens
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type="number"
                        {...register("childrenCount", { required: "Children count is required!" })}
                        defaultValue={0}
                        min={0}
                    />
                    {errors.childrenCount && (
                        <span className='text-red-500 text-xs'>{errors.childrenCount?.message}</span>
                    )}
                </label>
            </div>
        </div></>)
}

export default HotelGuestsInputs;