import React, { useEffect, useState } from 'react'
import useThrottle from '../Hooks/UseThrottle'
import { useNavigate } from 'react-router'
import Header from './Header'
import ButtonGroup from './ButtonGroup'
import SearchInput from './SearchInput'
import DataList from './DataList'

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

const highlightText = (text, highlight) => {
  if (!highlight || !text) return text
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span>{parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? <span key={i} style={{backgroundColor: 'yellow'}}>{part}</span> : part
  )}</span>;
}

function MainComponent() {

  const [resourceType, setResourceType] = useState('')
  const [items, setItems] = useState([])
  const [id, setId] = useState('')
  const [isShowById, setIsShowByID] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(true)
  const [isValidInput, setIsValidInput] = useState(true)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const throttledQuery = useThrottle(query, 500);

  const filteredItems = items.filter(item=> searchInObject(item, query))
 
  const deletePost = (id) => {
    setItems(items.filter(item => id !== item.id))
  }

  const handleNavigate = () => {
    navigate('AddPost')
  }

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error (response.status === 404 ?'Id doesnot exist' :'Network problems')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Some problems')
      throw error
    }
  }
  
  useEffect(() => {
    if (!resourceType) return
    const fetchItems = async () => {
      if (isShowById && id) {
        try {
          const post = await fetchData(`https://jsonplaceholder.typicode.com/${resourceType}/${id}`)
          setItems([post])
        } catch (error) {
          setId('')
          setIsValidInput(false)
          alert(error.message)
        }
      } else {
        try {
          const items = await fetchData(`https://jsonplaceholder.typicode.com/${resourceType}`)
          setItems(items)
        } catch (error) {
          console.error('There has been a problem with your fetch operation: ', error)
        }
      }
    }
    fetchItems()
  }, [resourceType, id, isShowById])

  return (
    <div >
      <Header 
        handleNavigate={handleNavigate}
        setIsValidInput={setIsValidInput}
        setIsShowByID={setIsShowByID}
        setResourceType={setResourceType}
        setId={setId}
        id={id}
        resourceType={resourceType}
        isShowById={isShowById}
        setItems={setItems}
      />
      <ButtonGroup 
        setResourceType={setResourceType} 
        resourceType={resourceType} 
        isValidInput={isValidInput} 
      />
      <SearchInput 
        query={query} 
        setQuery={setQuery} 
        isShowSearch={!isShowById && isShowSearch} 
      />
      <DataList 
        items={filteredItems} 
        query={throttledQuery} 
        deletePost={deletePost} 
        isShowById={isShowById} 
        highlightText={highlightText}
      />
    </div>
  )
  }
  


export default MainComponent
