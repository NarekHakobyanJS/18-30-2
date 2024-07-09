import React from 'react'
import { FilmsDataType } from '../../store/slices/filmsSlice'
import './FilmsCard.css'
import { NavLink } from 'react-router-dom'


type FilmsCardPropsType = {
    film: FilmsDataType
}

export const imgUrl = "https://image.tmdb.org/t/p/w500/"

const FilmsCard = ({ film }: FilmsCardPropsType) => {
    return (
        <div className='filmCard'>
            <h3>{film.title}</h3>
            <NavLink to={`/${film.id}`}><img src={imgUrl + film.poster_path} /></NavLink>
            
        </div>
    )
}

export default FilmsCard