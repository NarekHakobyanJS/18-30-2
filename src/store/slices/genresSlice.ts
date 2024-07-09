import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MovieAPI } from "../../api/api";
import { AxiosResponse } from "axios";

type GenresStateType = {
    genres: Array<GenresDataType>,

}
export type GenresDataType = {
    id: number,
    name: string
}
/// <async return, async arg, 2 arg type> 
export const fetchGenres = createAsyncThunk<Array<GenresDataType>>(
    'fetchGenres',
    async () => {
        const response: AxiosResponse<GenresStateType> = await MovieAPI.getGenres()


        return response.data.genres
    }
)

const initialState: GenresStateType = {
    genres: []
}
const genresSlice = createSlice({
    name: "genresSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Array<GenresDataType>>) => {
            state.genres = action.payload
        })
    }
})

export default genresSlice.reducer