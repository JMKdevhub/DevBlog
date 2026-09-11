//bas ek coding style dikhane k liye ki kis tarah se ek common button banake baad me usko multiple jagah reuse 
//kr skte h 

function Button({CreateAccount,
    type='button',
    bgColor='bg-blue-500',
    textColor = 'text-white',
    className='',
    ...props
}) {
    

    return (
        //backtick normally toh use kr ni skte h, JS K syntax h toh saath me curly braces bhi honi chahiye
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${className} ${textColor}`}
        {...props}>
            {CreateAccount}
        </button>
    );
}

export default Button;
