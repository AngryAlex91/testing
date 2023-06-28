import React, { useMemo } from 'react'


const DataList = ({ items, query, deletePost, isShowById, highlightText }) => {
    const renderHighlightText = useMemo(() => highlightText, [query]);
  
    return (
      <div className='container mx-auto px-20 text-justify'>
        <div className='border-solid border-black border-2'>
          <ul>
            {!isShowById && items.map(item => 
              <li key={item.id}>
                {renderHighlightText(JSON.stringify(item, null, 2),query)}
                <button className='default_btn' onClick={() => deletePost(item.id)}>Delete</button>
              </li>
            )}
          </ul>
          {isShowById && <span>{JSON.stringify(items[0], null, 2)}</span>}
        </div>
      </div>
    )
  }

export default DataList