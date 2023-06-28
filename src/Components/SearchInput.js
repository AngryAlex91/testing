import React from 'react'

const SearchInput = ({ query, setQuery, isShowSearch }) => (
    <div className='mt-2 mb-2'>{isShowSearch && 
      <input 
        className='input'
        placeholder='title body'
        type='search' value={query} onChange={e=>setQuery(e.target.value)}/>
    }</div>
  );

export default SearchInput