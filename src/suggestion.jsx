import React from 'react'

const Suggestion = ({data, handleClick}) => {

  return (
    <ul>
      <div>
        {
          data && data.length > 0 ?
          data.map((item,index) => (
            <li
              key={index}
              onClick={handleClick}
            >{item}</li>
          ))
          : null
        }
      </div>
    </ul>
  )
}

export default Suggestion;