import React, { useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import FilmsCard from '../components/FilmsCard/FilmsCard'

import './pages.css'
import { useDispatch } from 'react-redux'
import { changePage } from '../store/slices/filmsSlice'

// 900000 20

const HomePage = () => {
    const { films, page, total_pages, total_results } = useAppSelector((state) => state.filmsData)

    const dispatch = useAppDispatch()
    let portionSize = 10
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let [active, setActive] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    console.log((portionNumber - 1) * portionSize + 1);

    let rightPortionPageNumber = portionNumber * portionSize

    const pagesCount = Math.ceil(total_results / 20)

    let pages: number[] = []

    const a = useMemo(() => {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return pages
    }, [pages])


    const changeCurentPage = (pageNumber: number) => {
        dispatch(changePage(pageNumber))
        setActive(pageNumber)
    }
    return (
        <div>
            <div className='home-block'>
                {
                    films
                        .map((film) => {
                            return <FilmsCard key={film.id} film={film} />
                        })
                }
            </div>
            <div>
                {
                    portionNumber > 1 &&
                    <button onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>
                }
                {
                    a
                        .filter((movie) => movie >= leftPortionPageNumber && movie <= rightPortionPageNumber)
                        .map((p) => {
                            return <button className={p === active ? 'a' : ''} onClick={() => changeCurentPage(p)}>{p}</button>
                        })
                }

                {
                    pagesCount > portionNumber &&
                    <button onClick={() => { setPortionNumber(portionNumber + 1) }}>next</button>
                }
            </div>
        </div>
    )
}

export default HomePage