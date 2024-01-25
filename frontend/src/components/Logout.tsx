import { useMutation } from "react-query";
import * as user from '../api/user.api';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const mutation = useMutation(user.Logout, {
        onSuccess: async () => {
            showToast({ message: "You have been logged out!", type: "SUCCESS" });
            navigate('/');

        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const logoutHandler = () => {
        mutation.mutate();
    }

    return (<>
        <button onClick={logoutHandler} className='bg-white flex items-center rounded-md text-purple-500 px-3 font-bold hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'>Log out</button>
    </>);
}

export default Logout;