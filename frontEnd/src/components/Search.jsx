import React from 'react'
import { Input } from './ui/input'
import {useNavigate} from "react-router-dom"
import { RouteSeacrh } from '@/helper/RouterName'
import { useState } from 'react'


const Search = () => {
  const navigate=useNavigate()
  const [query, setQuery]=useState()
  const getInput=(e)=>{
    setQuery(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(RouteSeacrh(query))
  }
  return (
    <form action="" onSubmit={handleSubmit}>
        <Input name="q" onInput={getInput} placeholder='Search...' className='rounded-full h-9'/>
    </form>
  )
}

export default Search