import { useMutation } from "react-query";
import HotelForm from "../forms/hotels/HotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as hotelsApiClient from '../api/hotels.api';



const AddNewHotel = () => {

    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(hotelsApiClient.createNewHotel, {
        onSuccess: async () => {
            showToast({ message: "New Hotel Created!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Creating Hotel!", type: "ERROR" });
        }
    });
    const handlePostForm = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }

    return (<>
        <HotelForm postForm={handlePostForm} isLoading={isLoading}/>
    </>)
}

export default AddNewHotel;