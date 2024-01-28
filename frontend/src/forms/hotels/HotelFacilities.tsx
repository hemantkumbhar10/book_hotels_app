import { useFormContext } from 'react-hook-form';
import { hotelFacilitiesData } from '../../config/hotelOptions.config';
import { HotelFormData } from './HotelForm';

const HotelFacilities = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (<>
        <div>
            <h2 className="text-2xl font-bold mb-3">Hotel Facilities</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 justify-stretch">
                {hotelFacilitiesData.map((facility, index) => {
                    return <>
                        <label
                            key={facility + "_" + index}
                            className='text-sm flex gap-1'>
                            <input
                                type='checkbox'
                                value={facility}
                                {...register("facilities", {
                                    validate: (facilities) => {
                                        if (facilities && facilities.length > 0) {
                                            return true;
                                        } else {
                                            return "Atleast one facility is required!"
                                        }
                                    }
                                })}
                            />
                            {facility}
                        </label>
                    </>
                })}
            </div>
            {errors.facilities && (
                <span className="text-red-500 text-xs font-bold">{errors.facilities.message}</span>
            )}
        </div></>)
}

export default HotelFacilities;