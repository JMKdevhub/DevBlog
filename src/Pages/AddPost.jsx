import {Container, PostForm} from '../Components/index'

function AddPost(props) {
    return (
        <div className='py-8'>
            <Container>
                <PostForm/>
            </Container>
        </div>
    );
}

export default AddPost;