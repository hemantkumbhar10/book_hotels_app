

type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
        <div className="border-b border-purple-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Star Ratings</h4>
            {["5", "4", "3", "2", "1"].map((star) => (
                <label htmlFor="" className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded accent-purple-500"
                        value={star}
                        checked={selectedStars.includes(star)}
                        onChange={onChange}
                    />
                    <span className="">{star} Stars</span>
                </label>
            ))}
        </div>
    )
}
export default StarRatingFilter;