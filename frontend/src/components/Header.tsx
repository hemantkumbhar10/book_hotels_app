import {Link} from 'react-router-dom'

const Header = () =>{
    return <>
    <header className="bg-purple-700 py-6 ">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking tracking-tight">
                <Link to="/">HOMS</Link>
            </span>
            <span className='flex flex-x-2'>
                <Link to='/sign-in' className='bg-white flex items-center rounded-md text-purple-700 px-3 font-bold hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'>Login</Link>
            </span>
        </div>

    </header>
    </>
}

export default Header;