import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Header.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchGenres } from '../../store/slices/genresSlice'
import GenresBTN from './GenresBTN/GenresBTN'
import { changeInputValue, searchFilms } from '../../store/slices/filmsSlice'


const Header = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false)
  const {genres} = useAppSelector((state) => state.genresData)
  const {text, searchFilmsData} = useAppSelector(state => state.filmsData)

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  useEffect(() => {
    if(text.length > 2){
      dispatch(searchFilms(text))
      setOpen(true)
    }else{
      setOpen(false)
    }

  }, [text])

  return (
    <header>
        <div>
            <h4>logo</h4>
        </div>
        <nav>
            {
              genres.map((genre) => {
                return <GenresBTN key={genre.id} genre={genre}/>
              })
            }
        </nav>
        <div className='wrapper'>
            <input value={text} onChange={e => dispatch(changeInputValue(e.target.value))}/>
            {open &&<div className='popup'>
              {searchFilmsData.map(el => <li>{el.title}</li>)}
              </div>}
        </div>
    </header>
  )
}

export default Header