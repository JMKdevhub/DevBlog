import { useState } from "react";
import { Container,PostForm } from "../Components";
import appWriteService from '../appwrite/db_bucket_service'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditPost() {
    const [post,setpost] = useState([])

    const {slug} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        //dig deeper into it
        if(slug){
            appWriteService.getPost(slug).then((post)=>{
                if(post) setpost(post)
            })
        }else{
            navigate('/')
        }
    },[slug,navigate] )


    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ): null;
}

export default EditPost;