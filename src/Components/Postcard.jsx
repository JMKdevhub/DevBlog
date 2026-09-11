import appWriteService from '../appwrite/db_bucket_service'
//agr redux me hi stored hoti yeh chize toh appWrite ko query ni krna pdta-> can we improve on this

import {Link} from 'react-router-dom'


// $id          → Appwrite ka document ID
// $createdAt   → Appwrite ne kab create kiya
// $updatedAt   → Appwrite ne kab update kiya

//appwrite isi fashion me store krta h 
function Postcard({post}) {
    //Link ki khaas baat yeh h ki pura URL ni dena pdta jaha pe ho wha se aage k raasta dikha do bas
    return (
        // Link kisi bhi element/content ko clickable navigation bana sakta hai.
        <Link to={`/post/${post.$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appWriteService.getFilePreview(post.featuredImage)} alt=''
                    //yeh ek URL return krta h
                    className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{post.title}</h2>
            </div>
        </Link>
    );
}

export default Postcard;

