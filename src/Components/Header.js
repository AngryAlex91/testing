import React from 'react'

const Header = ({ handleNavigate, setIsValidInput, setIsShowByID, setResourceType, setId, id, isShowById, resourceType, setItems }) => (
    <div className='jusify-items-stretch mb-4'>
    <div className='relative mb-2'>
      <select 
        className='selector'
        onChange={e => {
          if (e.target.value === 'show by ID') {
            setIsShowByID(true);
            setIsValidInput(false);
            setResourceType(resourceType);
            setItems([])
          } else if (e.target.value === 'show All') {
            setIsShowByID(false);
            setId('');
            setIsValidInput(true);
            setResourceType(resourceType);
          }      
        }}>
          <option>show All</option>
          <option>show by ID</option>
      </select>
      {isShowById && 
      <input 
        className={id === '' ?'input input-required' :'input'} placeholder='ID required'
        type='text' value={id} required onChange={e => { 
          setId(e.target.value)
          if(e.target.value === '') {
            setIsValidInput(false)
          } else {
            setIsValidInput(true)
          }
        }}/>
      }
      <div className=' absolute right-0 top-0'>
        <button className='btn btn-default' onClick={handleNavigate}>Add post</button>
      </div>
    </div>
  </div>
);
  

export default Header