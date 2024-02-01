import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./HotelForm";



const HotelImageUploader = () => {

    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();


    const existingImageUrls = watch('imageUrls');

    const ImageDeleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl));
    }

    return (<>
        <div>
            <h2 className="text-2xl font-bold mb-3">Upload Images</h2>
            <div className="border rounded-md p-4 flex flex-col gap-4">
                {
                    existingImageUrls && (
                        <div className="grid grid-cols-6 gap-4">
                            {
                                existingImageUrls.map((url, index) => (
                                    <div className="relative group" key={url + "_" + index}>
                                        <img src={url} alt={`Hotel view ${index}`} className="min-h-full object-cover" />
                                        <button onClick={(e) => ImageDeleteHandler(e, url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("hotelImages", {
                        validate: (hotelImages) => {
                            //HERE hotelImages ARE ONLY CURRENT UPLOADED IMAGE
                            //WE NEED TO CONSIDER EXISITNG IMAGES TOO WHEN EDITING FORM
                            //IF THEY EXIST ADD OR ELSE 0
                            const arrlength = hotelImages.length + (existingImageUrls?.length || 0);

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