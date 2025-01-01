import React from 'react'

const Lists = ({players}) => {
  return (
    
      <div className='md:flex justify-between md:mx-10 border-black border-2 rounded-3xl my-3 p-1 md:p-3 bg-slate-300'>
        <div className='md:ml-3 ml-4 md:text-lg font-semibold'><h1>NAME: {players.name}</h1></div>
        <div className='ml-4 md:ml-0 mr-3 md:text-lg font-semibold text-red-600'><h2>HIGHEST SCORE: {players.highestScore}</h2></div>
      </div>

  )
}

export default Lists
