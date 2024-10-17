import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const Places = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    } 
  return (
    <div className='w-full min-h-screen'>
        <Header title={"Places"} handleBack={handleBack} map={true}></Header>

    </div>
  )
}

export default Places