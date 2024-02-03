

export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, pages, onPageChange }: Props) => {

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (<>
        <div className="flex justify-center">
            <ul className="flex">
                {
                    pageNumbers.map((number) => (
                        <li className={`px-4 py-2 rounded-full border-none ${page === number ? "bg-purple-200" : ""}`}>
                            <button onClick={() => onPageChange(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>);
}

export default Pagination;