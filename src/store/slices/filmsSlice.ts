import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { MovieAPI } from "../../api/api";
import { AxiosResponse } from "axios";


export type FilmsDataType = {
    adult : boolean,
    backdrop_path : string,
    id : number,
    original_language : string,
    original_title : string,
    overview : string,
    popularity : number,
    poster_path : string,
    release_date : string,
    title : string,
    video : boolean,
    vote_average : number,
    vote_count : number

}

type FilmsStateType = {
    films : Array<FilmsDataType>,
    page : number,
    total_pages : number,
    total_results : number,
    searchFilmsData: Array<FilmsDataType>,
    text: string,
    uniqueFilm:FilmsDataType | null

}

type FilmsStateTypeBYAxios = {
    results : Array<FilmsDataType>,
    page : number,
    total_pages : number,
    total_results : number
}

export const fetchFilms = createAsyncThunk<Array<FilmsDataType>, number>(
    'fetchFilms',
    async (page, {dispatch}) => {
        const resposne : AxiosResponse<FilmsStateTypeBYAxios> = await MovieAPI.getFilmsByPage(page);

        dispatch(total({totalResults : resposne.data.total_results, totalPages : resposne.data.total_pages}))
        return resposne.data.results
    }
)

export const searchFilms = createAsyncThunk<Array<FilmsDataType>, string>('searchFilms', async (text) => {
    const res = await MovieAPI.searchFilms(text)
    return res.data.results
})
export const fetchUniqueFilm=createAsyncThunk(
    "fetchUniqueFilm",
    async (id:string | undefined)=>{
        const res= await MovieAPI.getUniqueFilm(id);
        return res.data
    }
)

const initialState : FilmsStateType= {
    films : [], 
    page : 1,
    total_pages : 0,
    total_results : 0,
    searchFilmsData: [],
    text: '',
    uniqueFilm:null
}
const filmsSlice = createSlice({
    name : 'filmsSlice',
    initialState,
    reducers : {
        total(state, action){
            state.total_pages = action.payload.totalPages
            state.total_results = action.payload.totalResults
        },
        changePage(state, action){
            state.page = action.payload
        },
        changeInputValue(state, action){
            state.text = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchFilms.fulfilled, (state, action) => {
            state.films = action.payload
        })
        builder.addCase(searchFilms.fulfilled, (state, action) => {
            state.searchFilmsData = action.payload
        })
        builder.addCase(fetchUniqueFilm.fulfilled,(state,action)=>{
            state.uniqueFilm=action.payload
        })
    },
})

export const {total, changePage, changeInputValue} = filmsSlice.actions
export default filmsSlice.reducer