
type Props = {
    sortOption?: string;
    onChange: (value: string) => void;
}

const SortFilters = ({ sortOption, onChange }: Props) => {

    return (<>
        <select
            value={sortOption}
            onChange={(event) => onChange(event.target.value)}
            className="p-2 rounded-md border"
        >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (Low to High)</option>
            <option value="pricePerNightDesc">Price Per Night (High to Low)</option>
        </select>
    </>)
}

export default SortFilters;