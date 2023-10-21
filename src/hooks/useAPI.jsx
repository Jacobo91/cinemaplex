import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useAPI = (key, endpoint, options = {}, param = null) => {

    const fetchData = () => {
        const url = `https://movies-api14.p.rapidapi.com/${endpoint}`;
        const headers = {
            'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        };
        return axios.get(url, { headers })
    }

    const mergedOptions = {
        ...options
    }

    return useQuery({
        queryKey: [key, param],
        queryFn: fetchData,
        ...mergedOptions
    })
}




