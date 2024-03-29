import { RegistrationFormData } from "../pages/Register"
import { LoginFormData } from "../pages/Login";
import { UserType } from "../../../backend/src/shared/types";

//AFTER BUNDLING FRONTEND AND BACKEND THERE WONT BE SEPARATE URLS 
//HENCE  BY SPECIFFYING EMPTY STRING, WE SAYING USE SAME URL FOR BACKEND AS WELL
const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL || "";


export const getCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/users/me`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error("Could not fetch user!!");
    }
    return response.json();
}


export const Register = async (formData: RegistrationFormData) => {

    //USING SIMPLE FETCH TO EXECUTE API ROUTES
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/users/register`, {
        method: 'POST',
        //TO INCLUDE COOKIES
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });


    //CONVERTS RESPONSE INTO READABLE JSON FORMAT
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

}


export const validateToken = async () => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/auth/validate-token`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error("Token is invalid!");
    }
    return response.json();
}

export const Login = async (loginData: LoginFormData) => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    const response_body = await response.json();
    if (!response.ok) {
        throw new Error(response_body.message);
    }
    return response_body;
}

export const Logout = async () => {
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/auth/sign-out`, {
        credentials: 'include',
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error('Log Out Failed!');
    }
}