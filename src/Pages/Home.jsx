import { useState } from 'react';
import appWriteService from '../appwrite/db_bucket_service'
import { Container,PostCard } from '../Components/index';
import { useEffect } from 'react';


console.log("home")
function Home(props) {
    const [posts, setPosts] = useState([])
useEffect(()=>{
    console.log("USE EFFECT STARTED");

    appWriteService.getActivePosts()
        .then((post)=>{
            console.log("HOME RESPONSE:", post);

            if(post){
                setPosts(post.documents)
            }
        })
        .catch((error)=>{
            console.log("HOME ERROR:", error);
        });

},[])

    if(posts.length == 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <PostCard
                            key={post.$id}
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
