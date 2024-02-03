import { hotelTypesData } from "../../config/hotelOptions.config";


type Props = {
    selectedTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
    return (
        <div className="border-b border-purple-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            {hotelTypesData.map((type) => (
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded accent-purple-500"
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={onChange}
                    />
                    <span className="">{type}</span>
                </label>
            ))}
        </div>
    )
}
export default HotelTypesFilter;