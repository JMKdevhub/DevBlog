import { useEffect, useState } from 'react';
import appWriteService from '../appwrite/db_bucket_service'
import {Container, PostCard} from '../Components/index'

function AllPosts(props) {
    const [posts,setPosts] = useState([])

    useEffect(() => {
    }, [])

    //iss empty array k jagah kuch queries hoti dene ko de skte the
    appWriteService.getPost([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;