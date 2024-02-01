import { useParams } from "react-router-dom";
import * as hotelApiClient from '../api/hotels.api';
import { useMutation, useQuery } from "react-query";
import HotelForm from "../forms/hotels/HotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const { data: hotel } = useQuery('getHotelById',
        () => hotelApiClient.getHotelById(hotelId || ''), {
        //QUERY DOES NOT EXECUTES IF ID IS NOT VALID
        enabled: !!hotelId,
    })

    const { mutate, isLoading } = useMutation(hotelApiClient.updateHotelById, {
        onSuccess: () => {
            showToast({ message: 'Hotel Updated Successfully!', type: 'SUCCESS' });

        },
        onError: () => {
            showToast({ message: "Could'nt Update Hotel!", type: "ERROR" });
        }
    });

    const updateHotelHandler = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }


    return <>
        <HotelForm myHotel={hotel} postForm={updateHotelHandler} isLoading={isLoading} />
    </>
}

export default EditHotel;