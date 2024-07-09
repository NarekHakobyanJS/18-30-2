import React from 'react'
import './GenresBTN.css'
import { GenresDataType } from '../../../store/slices/genresSlice'

type GenresBTNPropsType = {
    genre : GenresDataType
}
const GenresBTN  = ({genre} : GenresBTNPropsType) => {
  return (
    <button>{genre.name}</button>
  )
}

export default GenresBTN