// TinyMCE basically ek advanced textarea/editor provide karta hai.
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from '../config/config'
// Controller basically React Hook Form aur external/custom component (yha tinyMCE Editor) ke beech bridge hai.

//since yehi common editor component kaayi jagah pe use hoga, toh uska ref hona imp h 
function RTE({name,control,label,defaultValue=""}) {
    

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            Test
            <Controller
                name={name || "Content"}
                //agr user ne name nahi diya toh name field k value content hoga

                // React Hook Form, content naam ke field ko manage karne ke liye is Controller ko use karo.
                control={control}
                //jo bhi parent element iss RTE function ko call krega usko pura control de denge
                //taaki jitna bhi state call ho rhe h, jo bhi events h woh saara data share ho jaaye
                render={({field:{onChange}})=>(
                    // render ek function hai jo Controller ko batata hai ki UI mein kya render karna hai.
                    <Editor
                            apiKey={conf.appWriteEditorKey}
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                // Plugins = editor ke extra features.
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                            onEditorChange={onChange}
// TinyMCE bolta hai:
// "Jab content change ho, main onEditorChange call karunga."
// Tu bol raha hai:
// "Jab TinyMCE mein change ho, React Hook Form ka onChange chala dena."
                    />
                )}
            />
        </div>  
    );
}

export default RTE;



// User types "Hello"
//         ↓
// TinyMCE detects change
//         ↓
// onEditorChange()
//         ↓
// Controller's onChange()
//         ↓
// React Hook Form updates content
//         ↓
// form data now contains "Hello"