import { hotelFacilitiesData } from "../../config/hotelOptions.config";


type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
        <div className="border-b border-purple-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Facility</h4>
            {hotelFacilitiesData.map((facility) => (
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded accent-purple-500"
                        value={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={onChange}
                    />
                    <span className="">{facility}</span>
                </label>
            ))}
        </div>
    )
}
export default FacilitiesFilter;