import React, { useEffect, useRef, useState } from 'react';

// OtpInput component that takes length and onOtpSubmit callback as props
const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    // State to manage the OTP input values
    const [otp, setOpt] = useState(new Array(length).fill(""));

    // Ref to store references to input elements
    const inputRefs = useRef([]);

    // Effect to focus on the first input when the component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // ... (existing code)

    // Handler for input change events
    const handleChange = (index, e) => {
        const value = e.target.value;

        // Check if the entered value is a number
        if (isNaN(value)) return;

        // Create a copy of the current OTP array
        const newOtp = [...otp];

        // Update the array with the new value at the specified index
        newOtp[index] = value.substring(value.length - 1);

        // Update the state with the new OTP array
        setOpt(newOtp);

        // Combine the OTP array into a string
        const combinedOtp = newOtp.join("");

        // If the combined OTP length is equal to the specified length, call the onOtpSubmit callback
        if (combinedOtp.length === length) {
            onOtpSubmit(combinedOtp);
        } else {
            // Find the index of the next blank box
            const nextBlankIndex = newOtp.indexOf("");

            // If a blank box is found, focus on it
            if (nextBlankIndex !== -1) {
                inputRefs.current[nextBlankIndex].focus();
            } else {
                // If no blank box is available, trigger the onOtpSubmit function
                onOtpSubmit(combinedOtp);
            }
        }
    };

    // ... (existing code)


    // Handler for input click events
    const handleClick = (index) => {
        // Set the selection range of the current input to (1, 1)
        inputRefs.current[index].setSelectionRange(1, 1);

        // If the current input is not the first one and the previous input is empty, focus on the previous input
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    // Handler for input keydown events
    const handleKeyDown = (index, e) => {
        // If the Backspace key is pressed, the current input is empty, and the current input is not the first one,
        // focus on the previous input
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Render the component with input elements for each digit in the OTP
    return (
        <div>
            {otp.map((val, index) => (
                <input
                    type="text"
                    className='text-black w-12 m-1 p-2 rounded-md text-center focus: outline-none'
                    placeholder="0"
                    // Attach a ref to the current input element
                    ref={(input) => (inputRefs.current[index] = input)}
                    key={index}
                    value={val}
                    // Attach change, click, and keydown event handlers
                    onChange={(e) => { handleChange(index, e) }}
                    onClick={() => { handleClick(index) }}
                    onKeyDown={(e) => { handleKeyDown(index, e) }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
