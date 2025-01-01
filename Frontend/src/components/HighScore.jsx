import React from 'react'

const HighScore = ({highScore}) => {
  return (
    <>
    <div>
        <div className=' flex justify-center'><h1 className='md:text-7xl text-5xl font-semibold'>{highScore}</h1></div>
        <div className='text-lg font-bold'>High Score</div>
    </div>
    </>
  )
}

export default HighScore
