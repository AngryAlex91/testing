import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function AddPost() {

    const [input, setInput] = useState({id:'', title:'', body:''})
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleInput = e => {
        setInput({...input, [e.target.name]:e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        setPosts(prev=>{
            return [...posts, input]
        })
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    
        

        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error(error))    
    }
  return (
   <> 
   <div className='relative text-center'>
      <h1>Add post</h1>
      <div className=' absolute top-0 right-0'>
      <button className='default_btn'
              onClick={handleNavigate}>Back</button>
      </div>
    </div>
    <form className='grid' onSubmit={handleSubmit}>
    <div className='grid col-span-3 mr-20'>
        <input className='border-solid border-2 border-black'
               type='text' name='title' placeholder='Title' onChange={handleInput}/>
        <input className='border-solid border-2 border-black'
               type='text' name='body' placeholder='Body' onChange={handleInput}/>
    </div>
    <button className='default_btn'
            type='submit'>Add post</button>
    </form>
   {posts.map(post=><div>{post.body}{post.title}</div>)}
    </>
  )
}

export default AddPost
