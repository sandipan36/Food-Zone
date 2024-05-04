import React, { useState, useEffect } from 'react'

const Usefetch = (url) => {

  const [data,Setdata]=useState(null)
  const [error,Seterror]=useState(null)
  const [loading,Setloading]=useState(true)

  useEffect(() => {
    const fetchData = async ()=>{
      Setloading(true)
    try{
      const res = await fetch(url)
      const json= await res.json(url)
      Setdata(json)
      Setloading(false)
    }catch(error){
      Seterror(error)
      Setloading(false)
    }

    }
    fetchData()

  },[])

  return {loading, error, data}
}

export default Usefetch
