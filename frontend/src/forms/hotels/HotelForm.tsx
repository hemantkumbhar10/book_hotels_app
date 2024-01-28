import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsInputs from './HotelDetailsInputs';
import HotelTypes from "./HotelTypes";
import HotelFacilities from "./HotelFacilities";
import HotelGuestsInputs from "./HotelGuestsInputs";
import HotelImageUploader from "./HotelImageUploader";



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
    hotelImages: FileList;
}

type Props = {
    postForm: (hotelFormData: FormData) => void
    isLoading: boolean
}


const HotelForm = ({ postForm, isLoading }: Props) => {

    const formMethods = useForm<HotelFormData>();

    const { handleSubmit, } = formMethods;

    const createNewHotelSubmitHandler = handleSubmit((formDataJson: HotelFormData) => {

        //GATHER ALL FORM DATA IN ON EOBJECT AND SEND IT THROUGH API
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("type", formDataJson.type);
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childrenCount", formDataJson.childrenCount.toString());


        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        })

        Array.from(formDataJson.hotelImages).forEach((file) => {
            formData.append(`hotelImages`, file);
        })

        // for (const pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1] + "  TYPE OF--->" + typeof (pair[1]));
        //     console.log( pair[1].toString())
        // }
        // console.log(formDataJson)
        // console.log(formDataJson.name)
        postForm(formData);

    })



    return (<>
        <FormProvider {...formMethods}>
            <form className=' flex flex-col gap-5 max-w-md md:max-w-3xl  m-auto' onSubmit={createNewHotelSubmitHandler}>
                <HotelDetailsInputs />
                <HotelTypes />
                <HotelFacilities />
                <HotelGuestsInputs />
                <HotelImageUploader />
                <span className="flex justify-end">
                    <button disabled={isLoading} type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8'>
                        {isLoading ? "Creating hotel..." : "Create Hotel"}
                    </button>
                </span>
            </form>
        </FormProvider>
    </>)
}

export default HotelForm;