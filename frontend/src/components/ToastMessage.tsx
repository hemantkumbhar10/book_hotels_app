import { useEffect } from "react";

type ToastData = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

const ToastMessage = ({ message, type, onClose }: ToastData) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    },[onClose]);


    const toastStyles = type === "SUCCESS"
        ? "fixed bottom-20 right-4 z-50 p-4 rounded-md bg-green-700 text-white max-w-md"
        : "fixed bottom-20 right-4 z-50 p-4 rounded-md bg-red-700 text-white ,max-w-md";



    return (
        <>
            <div className={toastStyles}>
                <div className="flex justify-center items-center">
                    {/* ADD BUTTON TO CLOSE TOAST */}
                    <span className="text-sm font-semibold">{message}</span>
                </div>
            </div>
        </>
    );
}

export default ToastMessage;


