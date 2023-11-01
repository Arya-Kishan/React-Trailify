import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const a = 5;
const fetchData = async ({ queryKey }) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3${queryKey[1]}?api_key=7fad363f58889077cd601fe2d0ed4fb7` + `${queryKey[2] == undefined ? '' : `&with_genres=${queryKey[2]}`}`)
    return data;
}

export const useQueryApi = (endpoint, id) => {
    return useQuery({
        queryKey: ["data", endpoint, id],
        queryFn: fetchData,
        staleTime: 5000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}