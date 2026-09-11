import React, {useId} from 'react'
function Select({
    label, //label toh dena bnta h, thoda dhyan accessibility k rkh lete h
    options,
    classname='',
    ...props
},ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {
                label && <label
                    htmlFor={id}
                    className=''
                ></label>
            }
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}>
                {/* options ek array h */}
                 {/* loop tabhi chlega agr options empty array ni h */}
                {options?.map((val)=>(
                    <option key={val} value={val}>'
                        {val}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);

//another way of writing forwardRef