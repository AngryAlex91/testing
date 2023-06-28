import React from 'react'

const ButtonGroup = ({ setResourceType, resourceType, isValidInput }) => (
    <div className='flex-auto mb-2px' >
      <button
        className={resourceType === 'posts' ? 'btn btn-active' : 'btn btn-default'}
        onClick={()=>{setResourceType('posts')}}
        disabled={!isValidInput}>Posts</button>
      <button 
        className={resourceType === 'users' ? 'btn btn-active' : 'btn btn-default'}
        onClick={()=>setResourceType('users')}
        disabled={!isValidInput}>Users</button>
      <button 
        className={resourceType === 'comments' ? 'btn btn-active' : 'btn btn-default'}
        onClick={()=>setResourceType('comments')}
        disabled={!isValidInput}>Comments</button>
    </div>
  );

export default ButtonGroup