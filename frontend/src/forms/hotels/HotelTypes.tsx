import { useFormContext } from "react-hook-form";
import { hotelTypesData } from "../../config/hotelOptions.config";
import { HotelFormData } from "./HotelForm";

const HotelTypes = () => {
    const { register, watch, formState:{errors} } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (<>
        <div >
            <h2 className="text-2xl font-bold mb-3">Hotel Type</h2>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {hotelTypesData.map((hotelType, index) => (
                    <label
                        key={hotelType + "_" + index}
                        className={
                            typeWatch === hotelType ? "cursor-pointer bg-purple-300 text-xs md:text-sm rounded-full px-4 py-2 font-semibold"
                                : "cursor-pointer bg-gray-300 text-xs md:text-sm rounded-full px-4 py-2 font-semibold"
                        }>
                        <input
                            type="radio"
                            value={hotelType}
                            {...register("type", {
                                required: "Hotel type is required!"
                            })} 
                            className="hidden"/>
                        <span>
                            {hotelType}
                        </span>
                    </label>
                ))}
            </div>

            {errors.type &&(
                <span className="text-red-500 text-xs font-bold">{errors.type.message}</span>
            )}
        </div>
    </>)
}

export default HotelTypes;