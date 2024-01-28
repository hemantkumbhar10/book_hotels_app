import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./HotelForm";



const HotelImageUploader = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (<>
        <div>
            <h2 className="text-2xl font-bold mb-3">Upload Images</h2>
            <div className="border rounded-md p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("hotelImages", {
                        validate: (hotelImages) => {
                            const arrlength = hotelImages.length;

                            if (arrlength === 0) {
                                return "Atleast one image is required!"
                            }
                            if (arrlength > 6) {
                                return "Cannot upload images more than 6!"
                            }
                            return true;
                        }
                    })} />
            </div>
            {errors.hotelImages && (
                <span className="text-red-500 text-xs font-bold">{errors.hotelImages.message}</span>
            )}
        </div>
    </>)
}

export default HotelImageUploader;