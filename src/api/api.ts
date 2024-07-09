import axios from "axios";

const apiKey = "f36f23edf6e10fd2ddcf939916b1f67a"

const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3'
})

export const MovieAPI = {
    getGenres(){
        return instance.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`)
    },
    getFilmsByPage(pageCount : number){
        return instance.get(`/discover/movie?api_key=${apiKey}&language=en-US&page=${pageCount}`)
    },
    searchFilms(text: string){
        return instance.get(`search/movie?api_key=${apiKey}&query=${text}`)
    },
    getUniqueFilm(id:any){
        return instance.get(`/movie/${id}?api_key=${apiKey}&language=en-US`)
    }
}