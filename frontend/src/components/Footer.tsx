

const Footer =() => {
    return <>
    <footer className="bg-purple-500 py-10 px-5 md:px-0">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tight">
                Homs.com
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4 text-xs md:text-md">
                <p className="cursor-pointer">Privacy Policy</p>
                <p className="cursor-pointer">Terms & Conditions</p>
            </span>
        </div>
    </footer>
    </>
}

export default Footer;