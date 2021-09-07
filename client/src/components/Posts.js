import React, { useEffect, useState } from 'react';
import axios from 'axios';
import shortid from 'shortid';

const Posts = () => {

    const obj = {
        name : "ali",
        walk(){
            console.log("hello from walk")
        }
    }
    obj['name'] = "chaudahry";
    console.log(obj.name)

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [uid, setUid] = useState('user1');
    const [comments, setComments] = useState([])
    
    const api = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com"
    })
    useEffect(() => {
        api.get('/posts', {
            params: {
                _userId : 'user1',
                _limit: 5
            }
        })
            .then(res => res.data)
            .then(data => setPosts(data))
            .catch(error => console.log(error));

    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        if (title && body) {
            const newPost = {
                id: shortid.generate(),
                title,
                body,
                userId: uid
            }

            setPosts([...posts, newPost])
            setTitle('');
            setBody('');
        }
    }
    const deletePost = async (id) => {

        await api.delete(`/user/1/posts/${id}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    const showComments = async (id) => {
        await axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        }).then(res => {
            setComments(res.data)
            console.log(res.data)
        })
            .catch(error => console.log(error))
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">

                    {posts && posts.map((post) => (
                        <div key={post.id} className="card text-white mb-5">
                            <div className="card-header bg-dark"><h4>{post.title}</h4></div>
                            <div className="card-body text-dark bg-light py-5">
                                <p className="card-text">{post.body}.</p>
                            </div>
                            <div>
                                <button>Update</button>
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                                <button onClick={() => showComments(post.id)}>Show Comments</button>

                            </div>
                            {comments && comments.map(comment => {
                                if (comment.postId === post.id) {
                                    return (
                                        <div key={comment.id} className="p-2 text-dark">
                                            <h4>{comment.name}</h4>
                                            <h6>{comment.email}</h6>
                                            <p>{comment.body}</p>
                                        </div>
                                    )
                                }

                            })
                            }
                        </div>




                    ))}
                </div>
                <div className=" New_Post col-12">
                    <form>
                        <div class="mb-3">
                            <label for="title" class="form-label">Set post Title</label>
                            <input type="text" class="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="body" class="form-label">Set Post Body</label>
                            <input type="text" class="form-control" value={body} onChange={(e) => setBody(e.target.value)} />
                        </div>

                        <button onClick={e => formSubmit(e)}>Submit Post</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Posts
