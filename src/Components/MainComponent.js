import React, { useEffect, useRef, useState, useMemo } from 'react'
import useThrottle from '../Hooks/UseThrottle'
import { useNavigate } from 'react-router'


function MainComponent() {

  const [resourceType, setResourceType] = useState('')
  const [items, setItems] = useState([])
  const [posts, setPosts] = useState({})
  const [id, setId] = useState('')
  const [isShowById, setIsShowByID] = useState(false)
  const [isShowInput, setIsShowInput] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(true)
  const focusInput = useRef(null)
  const [activeButton, setActiveButton] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const throttledQuery = useThrottle(query, 500);

  const activeButtonClass = 'border-2 bg-red-500  py-2 px-3 text-white rounded-2xl'
  const defaultButtonClass = 'border-2 bg-black hovera:bg-gray-700 py-2 px-3 text-white rounded-2xl'

 

  



  const searchInObject = (obj, query) => {
    for(let key in obj) {
      let value = obj[key];
      let valueType = typeof value;
  
      if(valueType === 'object' && value !== null) {
        if(searchInObject(value, query)) {
          return true;
        }
      } else if(valueType === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
    }
  
    return false;
  }

  const filtredItems = items.filter(item=> searchInObject(item, query))
 
  const highlightText = useMemo(() => {
    return (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? <span key={i} style={{backgroundColor: 'yellow'}}>{part}</span> : part
    )}</span>;
  }
}, [throttledQuery])
  

 


  const showItemsByID = () => {
    
    setItems([])
    setPosts('Input ID')
    setIsShowByID(true)
    setIsShowSearch(false)
    
    
  }

  const showAllItems = () => {
    
    setItems([])
    setId('')
    setPosts({})
    setResourceType(resourceType)
    setIsShowByID(false)
    setIsValidInput(true)
    setIsShowSearch(true)
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
    console.log(throttledQuery);
  }, [throttledQuery]);
  

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

    if (isShowInput) {
      focusInput.current.focus()
    }

    return () => {
        if(focusInput.current) {
          focusInput.current.blur()
        }
      }     
  }, [resourceType, id, isShowById, isShowInput])
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
          setIsShowInput(true)
          setActiveButton(resourceType)
          setIsValidInput(false)

          focusInput.current && focusInput.current.focus()
          
          
        } else if (e.target.value === 'show All') {
          showAllItems()
          setIsShowInput(false)
          setActiveButton(resourceType)
          setIsValidInput(true)

        }
        

      }}>
        <option>show All</option>
        <option>show by ID</option>
    </select>
    </div>
    {isShowInput && 
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
      <button className='default_btn'
      onClick={handleNavigate}>Add post</button>
      </div>
    

    
    </div>

    <div className='flex-auto' >
      <div>Search:{isShowSearch &&  
        <input 
          className='border-solid shadow-lg border-2 border-black required:border-red-500 '
          placeholder='title body'
          type='search' value={query} onChange={e=>setQuery(e.target.value)}/>}
      </div>
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
    <h1>{!isShowById && filtredItems.map(item => 
      <li key={item.id}>
        {highlightText(JSON.stringify(item, null, 2), query)}
      <button className='default_btn'
              onClick={()=>deletePost(item.id)}>Delete</button></li>)}</h1>
    <h1>{isShowById && 
    <span>{JSON.stringify(posts, null, 2)}</span>}</h1>
    </div>
  </div> 
</div> 
  </>
  )
  }
  


export default MainComponent
