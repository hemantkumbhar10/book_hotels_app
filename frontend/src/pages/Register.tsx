// import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as user from '../api/user.api';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';


export type RegistrationFormData = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Register = () => {

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>();
    const navigate = useNavigate();

    const {showToast} = useAppContext();

    //REACT QUERY TO MANAGE SERVER STATES WITH HOOK
    const mutation = useMutation(user.Register,{
        onSuccess:()=>{

            //CAN ADD GLOBAL STATE TOO WITH CONTEXT AND SHOW NOTIFICATION AT TOP HERE
            // console.log('Registration Successful!');
            showToast({message:"You have registered successfully!", type:"SUCCESS"});
            navigate("/");
        },
        onError:(error:Error)=>{
            // console.log(error.message);
            showToast({message:error.message, type:"ERROR"});
        }

    });

    const submitRegistrationForm = handleSubmit((data) => {
        // EXECUTE REACT QUERY TO HANDLE SERVER FETCH & STATES
        mutation.mutate(data);
    })

    return (
        <>
            <form className='flex flex-col gap-5 max-w-md m-auto' onSubmit={submitRegistrationForm}>
                <h2 className='text-2xl font-bold text-center text-gray-800'>Create New Account</h2>
                <div className='flex flex-col md:flex-row gap-5 justify-center'>
                    <label className='text-gray-700 text-sm font-bold'>
                        First Name
                        <input className='border rounded w-full py-1 px-2 font-normal'
                            {...register("firstname", { required: "First Name is required!" })}
                        />
                        {errors.firstname && (
                            <span className='text-red-500 text-xs'>{errors.firstname.message}</span>
                        )}

                    </label>
                    <label className='text-gray-700 text-sm font-bold'>
                        Last Name
                        <input className='border rounded w-full py-1 px-2 font-normal'
                            {...register("lastname", { required: "Last Name is required!" })}
                        />
                        {errors.lastname && (
                            <span className='text-red-500 text-xs'>{errors.lastname.message}</span>
                        )}
                    </label>
                </div>
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
                    Enter New Password
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type='password'
                        {...register("password",
                            {
                                required: "Password is required!",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message: "Password must be atleast 1 Uppercase, 1 symbol, 1 number & more than 6 characters!"
                                }
                            })}
                    />
                    {errors.password && (
                        <span className='text-red-500 text-xs'>{errors.password.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold'>
                    Confirm New Password
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        type='password'
                        {...register("confirmPassword",
                            {
                                validate: (val) => {
                                    if (!val) {
                                        return "This field is required!"
                                    }
                                    else if (watch("password") !== val) {
                                        return "Those passwords didn't match. Try again!"
                                    }

                                }
                            }
                        )}
                    />
                    {errors.confirmPassword && (
                        <span className='text-red-500 text-xs'>{errors.confirmPassword.message}</span>
                    )}
                </label>
                <span>
                    <button type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md'>
                        Create New Account
                    </button>
                </span>
            </form>
        </>
    )
}

export default Register;