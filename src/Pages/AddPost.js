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

    const handleSubmit = async e => {
        e.preventDefault()
        setPosts(prev => [...prev, input])

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        if (!response.ok) {
            throw new Error('HTTP error')
        }

        const json = await response.json()
        } catch (error) {
            console.error(error)
        }   
    }
  return (
   <> 
   <div className='relative text-center'>
      <div className='font-bold'>
        Add post
      </div>
      <div className=' absolute top-0 right-0'>
      <button className='btn btn-default'
              onClick={handleNavigate}>Back</button>
      </div>
    </div>
    <form className='grid' onSubmit={handleSubmit}>
    <div className='grid col-span-3 mr-20'>
        <input className='input'
               type='text' name='title' placeholder='Title' onChange={handleInput}/>
        <input className='input'
               type='text' name='body' placeholder='Body' onChange={handleInput}/>
    </div>
    <button className='btn btn-default'
            type='submit'>Add post</button>
    </form>
   {posts.map(post=><div>{post.body}{post.title}</div>)}
    </>
  )
}

export default AddPost
