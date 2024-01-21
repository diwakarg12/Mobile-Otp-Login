import { useState } from 'react'
import { FaPhone } from "react-icons/fa6";
import OtpInput from './OtpInput';

const PhoneNumber = () => {
    // State to store the phone number
    const [number, setNumber] = useState("");
    // State to toggle between phone input and OTP input
    const [otpInput, setOtpInput] = useState(true);

    // Handler for submitting the phone number form
    const handlePhoneSubmit = (e) => {
        e.preventDefault();

        // Regular expression to check for non-numeric characters
        const regex = /[^0-9]/g;

        // Check if the phone number is valid
        if (number.length < 10 || regex.test(number)) {
            alert("Invalid Phone number");
            return;
        }

        // Switch to OTP input mode
        setOtpInput(false);
    }

    // Handler for OTP submission
    const onOtpSubmit = (otp) => {
        alert("Login successfully");
    }

    return (
        <div className=''>
            {/* Conditional rendering based on the otpInput state */}
            {otpInput ? (
                <form className='flex flex-col items-center '>
                    {/* Phone icon */}
                    <FaPhone className='absolute text-slate-800 mt-[0.5rem] mr-[20rem]' />
                    {/* Phone number input */}
                    <input
                        type="number"
                        className='p-1 pl-10 text-black rounded-md hover:outline-none placeholder:text-slate-800'
                        placeholder='phone'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    {/* Button to trigger OTP submission */}
                    <button className='bg-green-600 mt-4 pt-1 pb-1 pr-2 pl-2 rounded-md hover:bg-orange-600 hover:rounded-sm'
                        onClick={handlePhoneSubmit}>
                        Send OTP
                    </button>
                </form>
            ) : (
                // Display OTP input when otpInput state is false
                <div>
                    <h3>Enter OTP sent to {number}</h3>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    )
}

export default PhoneNumber;
