import React from 'react'

const NumberSelector = ({selectedNum , setSelectedNum ,setNonum, Nonum}) => {
    const arrNumber = [1,2,3,4,5,6];
    const clickedNum =(value)=>{
        setSelectedNum(value);
        setNonum(false)
    }
    console.log(selectedNum)
  return (
    <>
    <div>
    <div>
        {
            arrNumber.map((value , i)=>(
                <button
                className='md:px-8 px-4 hover:bg-black hover:text-white focus:bg-black focus:text-white duration-200 ease-in-out md:py-5 py-2 text-3xl font-semibold border-black border-2 m-2 '
                key = {i}
                onClick={()=> clickedNum(value)}>
                    {value}
                </button>
            ))
        }
    </div>
    
    <div className='flex md:justify-end justify-center'><h1 className={`text-2xl font-bold mr-3 ${Nonum ? "text-red-600":"text-black"}`}>{ Nonum ? "First Select Any Number":"Select Number"}</h1></div>
    </div>
    
    </>
  )
}

export default NumberSelector
