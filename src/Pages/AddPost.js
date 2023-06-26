import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function AddPost() {

    const [input, setInput] = useState('')
    const [posts, setPosts] = useState({title:'', body:''})

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleInput = e => {
        setInput({...posts, [e.target.name]:e.target.value})
    }

    const handleSubmit = e => {
        e.preventdefault()
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(posts),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        

        .then(response => response.json())
        .then(json => console.log(json))
        // .then(json => setPosts(json))
        .catch(error => console.error(error))
        
    }
  return (
   <> 
   <div className='relative text-center'>
      <h1>Add post</h1>
      <div className=' absolute top-0 right-0'>
      <button className='border-2 bg-black hover:bg-gray-700 py-2 px-3 text-white rounded-2xl'
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
    <button className='border-2 bg-black hover:bg-gray-700 py-2 px-3 text-white rounded-2xl'
            type='submit'>Add post</button>
    </form>
    </>
  )
}

export default AddPost
