

type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {

    return (<>
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select name="" id="" value={selectedPrice}
            className="focus:outline-purple-200 p-2 border rounded-lg w-full"
                onChange={(event) =>
                    onChange(event.target.value
                        ? parseInt(event.target.value) : undefined)}
            >
                <option value="" className="bg-purple-100">Select Max Price</option>
                {[500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map((price) => (
                    <option value={price} className="bg-purple-50">{price}</option>
                ))}
            </select>
        </div>
    </>)
}

export default PriceFilter;