import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext';

const Header = () => {

    const { isLoggedIn } = useAppContext();

    return <>
        <header className="bg-purple-500 py-6 ">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking tracking-tight">
                    <Link to="/">HOMS</Link>
                </span>
                <span className='flex flex-x-2'>
                    {
                        !isLoggedIn ? (
                            <Link to='/sign-in' className='bg-white flex items-center rounded-md text-purple-500 px-3 font-bold hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'>Login</Link>

                        ) :
                            (
                                <>
                                    <Link to='/reservations'>Reservations</Link>
                                    <Link to='/favourites'>Favourites</Link>
                                    <button>Log out</button>
                                </>
                            )
                    }
                </span>
            </div>

        </header>
    </>
}

export default Header;