import { useId } from "react";
import React from "react";
const Input = React.forwardRef( function Input(
    {label,
    type="text",
    className='',
    ...props
    }, 
    ref){
        const id = useId()
        return (
            <div className="w-full">
                {label && (
                    <label 
//label ko input se associate kar deta hai.
// So user "Email" label par click karega → corresponding input focus ho sakta hai.
                        className="block mb-1 pl-1" 
    //yeh thoda accessibility purpose se use hua h  (htmlFor)         
                        htmlFor={id}
                    >
                        {label}
                    </label>
                )}
                
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
                        focus:bg-gray-50 duration-200 border 
                        border-gray-200 w-full
                    ${className} `}
                    ref={ref}
                    // Ref ka kaam sirf parent ko actual DOM input tak access dena hai.
                    {...props}
                    id={id}
                    //yeh highlight kaise kr rha h, yehh pta krna h 

                />
            </div>
        )
})

export default Input;

// Parent Component
// │
// │ const inputRef = useRef()
// │
// │ <Input ref={inputRef} />
// ↓
// Generic Input Component
// │
// │ forwardRef((props, ref) => ...)
// │                    ↑
// │       parent ka inputRef
// ↓
// <input ref={ref} />
// │
// ↓
// inputRef.current 
// │ (ab jb parent file me iss command ko execute kiya jaayega toh)
// ↓
// Actual <input> DOM element se linked 

//yha parent file matlb iss generic input field k use krte hue jo components banayenge 