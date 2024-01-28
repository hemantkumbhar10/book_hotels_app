import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsInputs from './HotelDetailsInputs';
import HotelTypes from "./HotelTypes";



export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childrenCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: FileList;
}


const HotelForm = () => {

    const formMethods = useForm<HotelFormData>();



    return (<>
        <FormProvider {...formMethods}>
            <form className=' flex flex-col gap-5 max-w-md md:container' >
                <HotelDetailsInputs />
                <HotelTypes/>
            </form>
        </FormProvider>
    </>)
}

export default HotelForm;