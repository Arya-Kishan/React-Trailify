import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3'

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmFkMzYzZjU4ODg5MDc3Y2Q2MDFmZTJkMGVkNGZiNyIsInN1YiI6IjY0YzVmMGNmNjNlNmZiMDBjNDA5MmM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5OZ82qMHmh_GkAKTxhhWsAGFXfSohj9gAsM8LpEyowE";

const headers = {
    Authorization : 'bearer ' + TMDB_TOKEN,
}

export const fetchDataFromApi = async(url,params)=>{
    try {
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}