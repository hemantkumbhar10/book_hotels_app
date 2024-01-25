import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as user from '../api/user.api';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';


export type LoginFormData = {
    email: string,
    password: string,
}

const Login = () => {

    const { register, watch, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();

    const { showToast } = useAppContext();


    const mutation = useMutation(user.Login, {
        onSuccess: async () => {
            showToast({ message: 'You logged in successfully!', type: "SUCCESS" });
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    })


    const submitLoginForm = handleSubmit((data) => {
        mutation.mutate(data);
    })



    return (<>
        <form className='flex flex-col gap-5 max-w-md m-auto' onSubmit={submitLoginForm}>
            <h2 className='text-2xl font-bold text-center text-gray-800'>Login</h2>
            <label className='text-gray-700 text-sm font-bold'>
                Email
                <input className='border rounded w-full py-1 px-2 font-normal'
                    type='email'
                    {...register("email", { required: "Email is required!" })}
                />
                {errors.email && (
                    <span className='text-red-500 text-xs'>{errors.email.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold'>
                Enter Password
                <input className='border rounded w-full py-1 px-2 font-normal'
                    type='password'
                    {...register("password",
                        {
                            required: "Password is required!",
                        })}
                />
                {errors.password && (
                    <span className='text-red-500 text-xs'>{errors.password.message}</span>
                )}
            </label>
            <span>
                <button type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md'>
                    Log in
                </button>
            </span>
        </form>
    </>)
}


export default Login;