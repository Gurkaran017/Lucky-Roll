import React from 'react'

const TotalScore = ({score}) => {
  return (
    <>
    <div>
        <div className=' flex justify-center'><h1 className='md:text-7xl text-5xl font-semibold'>{score}</h1></div>
        <div className='text-lg font-bold'>Total Score</div>
    </div>
    </>
  )
}

export default TotalScore
