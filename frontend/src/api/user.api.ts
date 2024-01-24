import { RegistrationFormData } from "../pages/Register"

const BASE_BACKEND_API_URL = import.meta.env.VITE_BASE_BACKEND_API_URL;


export const Register = async(formData:RegistrationFormData)=>{

    //USING SIMPLE FETCH TO EXECUTE API ROUTES
    const response = await fetch(`${BASE_BACKEND_API_URL}/api/users/register`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
    });
    console.log(import.meta.env);

    //CONVERTS RESPONSE INTO READABLE JSON FORMAT
    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }

}
