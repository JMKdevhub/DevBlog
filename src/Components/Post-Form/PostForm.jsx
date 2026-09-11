//iss form se update bhi kr skte h aur add bhi (blogs)
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import  AppwriteService  from '../../appwrite/db_bucket_service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useEffect } from 'react';

function PostForm({post}) {
    //watch->kisi input field ko constantly monitor krna ho agr
    //setValue->value set krne k tarika, woh useState() leke ni krte yha
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            //post tabhi receive agr user edit kr rha h, uss case me kuch default values hongi
            //otherwise title ko "" (empty string) set kr do
            title:post?.title || '' ,
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const navigate = useNavigate()
    const userData = useSelector(state=>state.auth.userData) //kuch aur hoga toh dekh lena

    console.log("USER DATA:", userData)
    //user ne form mein jo bhara, woh sab data mein aa gaya.
    const submit = async (data) => {
        //user existing form me update krna chahta h 
        if(post){
            //APppwrite k db me store ho rha h featured image aur yehh form data se mila image h jo user ne abhi diya h
            // data.image generally FileList hota hai.
            const file = data.image[0] ? await AppwriteService.uploadFile(data.image[0]) : null;
            if(file){
//post.featuredImage magically ID nahi deta. Tumhare post data mein pehle se jo value image field mein stored hai, wahi argument ban rahi hai.
                await AppwriteService.deleteFile(post.featuredImage)
            }

            const db_post=await AppwriteService.updatePost(post.$id, {...data, 
                featuredImage: file? file.$id : undefined
            })

            if(db_post){
                //user ko updated post page pr bhej do
                navigate(`/post/${db_post.$id}`)
            }
        }
        else{
            //user naya blog create krna chahta h 

            //upload krne se pehle check kr lena user ne file diya h ya nahi 
            const file = await AppwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await AppwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
//                 FORM SUBMIT
//                      ↓
//                 submit(data)
//                      ↓
//               Is `post` present?
//                 /          \
//               YES           NO
//                ↓             ↓
//             UPDATE         CREATE
//                ↓             ↓
//        New image hai?     Image upload
//           /      \             ↓
//         YES      NO         file.$id
//          ↓        ↓             ↓
//     upload      null      data.featuredImage
//          ↓                      ↓
//  old image delete          createPost()
//          ↓                      ↓
//      updatePost()          dbPost returned
//          ↓                      ↓
//       navigate              navigate


    //title ko watch krna h aur slug generate krna h 

    //React ko bol rahe ho ki is function ko unnecessarily har render par naya mat banana.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '')
                .replace(/\s+/g, '-');
        }
        return '';
    }, []);


    useEffect(()=>{
        const subscription = watch((value, {name}) => {
            // value = current form values .
            // name = kaunsa field change hua.

            if(name === 'title'){
                // Kyuki humein sirf title change hone par slug generate karna hai.
                // Ye bol raha hai:
                // "slug" field ki value ko slugTransform(title) ke result se set kar do.
                setValue('slug', slugTransform(value?.title),{shouldValidate:true});
                // validation ka matlab bas ye hai ki form mein jo rules tune lagaye hain, woh check hon.
            }
        })


        // watch() ne ek subscription bana di:

        // watch
        // ↓
        // "mujhe changes batate rehna"

        // Component unmount hone par humein ye subscription hata deni hai.
        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])
//title value pe watch lgega


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/* Form mein jo content already hai, usko editor mein starting value bana do. */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={AppwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;


// PostForm
//    │
//    │ control
//    ↓
// RTE
//    │
//    │ control
//    ↓
// Controller
//    │
//    ↓
// TinyMCE Editor