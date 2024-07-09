import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUniqueFilm } from '../../store/slices/filmsSlice'

const UniquePage = () => {
const dispatch=useAppDispatch()
const {uniqueFilm}=useAppSelector((state)=>{
    return state.filmsData
})
    const {id}= useParams()
    useEffect(()=>{
        dispatch(fetchUniqueFilm(id))
    },[])
  return (
    
        <div>
            {
<h1>{uniqueFilm?.title}</h1>
    
            }
        </div>
        
    
  )
}

export default UniquePage