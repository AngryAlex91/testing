import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

function MainComponent() {

  const [resourceType, setResourceType] = useState('')
  const [items, setItems] = useState([])
  const [posts, setPosts] = useState({})
  const [id, setId] = useState('')
  const [showById, setShowByID] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const focusInput = useRef(null)
  const [activeButton, setActiveButton] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)
  const navigate = useNavigate()

  const activeButtonClass = 'border-2 bg-red-500  py-2 px-3 text-white rounded-2xl'
  const defaultButtonClass = 'border-2 bg-black hover:bg-gray-700 py-2 px-3 text-white rounded-2xl'

 


  const showItemsByID = () => {
    setShowByID(prevState => prevState + 1)
    setItems([])
    setPosts('Input ID')
    setShowByID(true)
    
    
  }

  const showAllItems = () => {
    
    setItems([])
    setId('')
    setPosts({})
    setResourceType(resourceType)
    setShowByID(false)
    setIsValidInput(true)
  }

  const deletePost = (id) => {
    setItems(items.filter(item => id !== item.id))
  }

  const handleClick = (resourceType) => {

   
    setResourceType(resourceType)
    setActiveButton(resourceType)
  }

  const handleNavigate = () => {
    navigate('AddPost')
  }

  
    
  

  useEffect(() => {
    
    if (resourceType && !id) {
        
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(response => {
      if (!response.ok) { throw new Error('Network response was not ok') }
      return response.json()
    }) 
    .then(json => setItems(json))
        .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    }
    
    if (resourceType && id) {
        
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}/${id}`)
      .then(response => {
        if (!response.ok) {throw new Error ('This ID doesnt exist') }
        
        return response.json()
    })
      .then(json => setPosts(json))
      .catch(error=> {
        setId('')
        setIsValidInput(false)
        alert(error.message)
      })

    }

    if (showInput) {
      focusInput.current.focus()
    }

    return () => {
        if(focusInput.current) {
          focusInput.current.blur()
        }
      }
   
      
      
  }, [resourceType, id, showById, showInput])

  

  return (

    <>
<div >
  <div className='jusify-items-stretch mb-4'>
    <div className='relative mb-2'>
    <div><select 
      className='border-solid border  border-black-500 py-1 px-2 bg-black text-white rounded-md '
      onChange={e => {
        if (e.target.value === 'show by ID') {
          showItemsByID()
          setShowInput(true)
          setActiveButton(resourceType)
          setIsValidInput(false)

          focusInput.current && focusInput.current.focus()
          
          
        } else if (e.target.value === 'show All') {
          showAllItems()
          setShowInput(false)
          setActiveButton(resourceType)
          setIsValidInput(true)

        }
        

      }}>
        <option>show All</option>
        <option>show by ID</option>
    </select>
    </div>
    {showInput && 
    <input 
      className='border-solid shadow-lg border-2 border-black required:border-red-500 ' placeholder='ID required'
      type='text' ref={focusInput} value={id} required onChange={e => { 
        setId(e.target.value)
        if(e.target.value === '') {
          setIsValidInput(false)

        } else {
          setIsValidInput(true)
        }
        
      }}/>}
      <div className=' absolute right-0 top-0'>
      <button className='border-2 bg-black hover:bg-gray-700 py-2 px-3 text-white rounded-2xl'
      onClick={handleNavigate}>Add post</button>
      </div>
    

    
    </div>

    <div className='flex-auto' >
    <button
      className={activeButton === 'posts'? activeButtonClass : defaultButtonClass}
      onClick={() => handleClick('posts')}
      disabled={isValidInput == false }>Posts</button>
    <button 
      className={activeButton === 'users'? activeButtonClass : defaultButtonClass}
      onClick={() => handleClick('users')}
      disabled={isValidInput == false}>Users</button>
    <button 
      className={activeButton === 'comments'? activeButtonClass : defaultButtonClass}
      onClick={() => handleClick('comments')}
      disabled={isValidInput == false}>Comments</button>
    </div>
    </div> 
  <div className='container mx-auto px-20 text-justify'>
    <div className='border-solid border-black border-2'>
    <h1>{!showById && items.map(item => 
      <li key={item.id}>{JSON.stringify(item, null, 2)}
      <button className='border-2 bg-black hover:bg-gray-700 py-1 px-1 text-white rounded-2xl'
              onClick={()=>deletePost(item.id)}>Delete</button></li>)}</h1>
    <h1>{showById && <span>{JSON.stringify(posts, null, 2)}</span>}</h1>
    </div>
  </div> 
</div> 
  </>
  )
  }
  


export default MainComponent
