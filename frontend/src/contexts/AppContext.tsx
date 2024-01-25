import React, { useState, createContext, useContext, Context } from 'react';
import ToastMessage from '../components/ToastMessage';
import { useQuery } from 'react-query';
import * as user from '../api/user.api';


type ToastMessageData = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

//TYPE FOR FUNCTION WHICH TAKES MESSAGE_DATA IF THE TOAST HAS TO BE SHOWN
type AppContextData = {
    showToast: (toastMessage: ToastMessageData) => void;
    isLoggedIn : boolean;
}

type ProviderData = {
    children?: React.ReactNode
}


//UNDEFINED IF WE HAVE TO RESET IT
const context = createContext<AppContextData | undefined>(undefined);

//PROVIDER PROVIDING SHOW TOAST FUNCTION
const AppContextProvider = ({ children }: ProviderData) => {

    //STORES TOAST DATA
    const [messageToast, setMessageToast] = useState<ToastMessageData | undefined>(undefined);

    //VALIDATE TOKEN AND RETURNS BOOLEAN BASED ON STATUS 200 OR 401/404/etc.
    //CREATES QUERY WITH KEY validateToken
    const {isError} = useQuery("validateToken", user.validateToken, {
        retry:false,
    })

    return (
        <context.Provider 
        //TO PROVIDE CURRENT CONTEXT VALUE TO CHILDRENS
        value={{
            //VALUE (STATE OF PROVIDER) is SET WHEN showToast EXECUTED BY HOOK
            showToast: (toastMessage) => {
                setMessageToast(toastMessage);
            },
            //PASSES CURRENT VALUE OF IS_ERROR 
            isLoggedIn:!isError,
        }}>
            {messageToast &&
                (<ToastMessage
                    message={messageToast.message}
                    type={messageToast.type}
                    onClose={() => setMessageToast(undefined)}
                >
                </ToastMessage>)}
            {children}
        </context.Provider>
    )
}

//HOOK TO USE PROVIDER 
export const useAppContext = () => {
    const appContext = useContext(context);

    return appContext as AppContextData;
}


export default AppContextProvider;


//FULL WORKING OF CONTEXT --->

//1. CREATED CONTEXT using createContext(), DEFINED EXACTLY WHICH DATA IT TAKES
//2.PROVIDER JSX
//  1.STATE WHICH STORES TOAST MESSAGE
//  2.PASSES DOWN showToast FUNCTION TO ITS CHILDREN 
//3. IN REGISTRATION FORM WE NEED TO USE TOAST ON SUCCESS OR ERROR
//4. HENCE WE HAVE TO useContext() to ACCESS PROVIDER VALUES
//5. i.e WE CREATED HOOK WHICH IMPLEMENTS THIS HOOK AND RETURNS CONTEXT VALUE
//6. WE GET showToast() FUNCTION FROM THIS CONTEXT
//7. WE EXECUTE showToast()
//8. ONCE EXECUTED PROVIDER VALUE FUNCTION showToast() WILL HAVE "TOAST_MESSAGE" ARGUMENT/STATE
//9. IT'LL SET STATE OF TOAST IN PROVIDER
//10.WE ARE SHOWING TOAST SO ITS ABOVE OUR WHOLE UI. HENCE WE CAN RENDER IT IN PROVIDER ITSELF AS IT WRAPS WHOLE APP
//11. IF MESSAGE_TOAST ? SHOW TOAST WITH MESSAGE AND TYPE. ALSO PROVIDES onClose() WHICH SETS TOAST_MESSAGE UNDEFINED AFTER 5 SECONDS