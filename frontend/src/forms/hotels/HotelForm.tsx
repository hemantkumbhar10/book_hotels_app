import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsInputs from './HotelDetailsInputs';
import HotelTypes from "./HotelTypes";
import HotelFacilities from "./HotelFacilities";
import HotelGuestsInputs from "./HotelGuestsInputs";
import HotelImageUploader from "./HotelImageUploader";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";



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
    imageUrls: string[];
}

type Props = {
    myHotel?: HotelType;
    postForm: (hotelFormData: FormData) => void;
    isLoading: boolean;
}


const HotelForm = ({ postForm, isLoading, myHotel }: Props) => {

    const formMethods = useForm<HotelFormData>();

    const { handleSubmit, reset } = formMethods;


    //SETS DEFAULT VALUES OF FORM AS PAGE LOADS
    //BEST PRACTICE- USE THIS INSIDE USEEFFECT AFTER SUCCESSFULL SUBMISSION OF FORM
    useEffect(() => {
        reset(myHotel);
    }, [myHotel, reset]);

    const createNewHotelSubmitHandler = handleSubmit((formDataJson: HotelFormData) => {

        //GATHER ALL FORM DATA IN ON EOBJECT AND SEND IT THROUGH API
        const formData = new FormData();

        //IN CASE OF EDIT DATA ADD ID TO THE FORM
        if (myHotel) {
            formData.append("hotelId", myHotel._id);
        }
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


        //IN CASE OF EDIT HOTEL POST EXXISITING IMAGES TOOO WHICH ARE NOT DELETED WHEN EDITED
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            })
        }

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
                        {myHotel ?
                            <>{isLoading ? "Updating hotel..." : "Update Hotel"}</> :
                            <>{isLoading ? "Creating hotel..." : "Create Hotel"}</>}
                    </button>
                </span>
            </form>
        </FormProvider>
    </>)
}

export default HotelForm;