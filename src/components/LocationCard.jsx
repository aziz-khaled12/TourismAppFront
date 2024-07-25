import React from 'react'
import hotelImage from "../assets/hotelImage.jpg"

const LocationCard = () => {
  return (
    <>
        <div className='w-[170px] h-[170px]'>
            <img src={hotelImage} alt="hotel" className='w-full h-full rounded-lg'  />
        </div>
    </>
  )
}

export default LocationCard