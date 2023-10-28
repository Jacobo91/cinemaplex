import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useSearch = (query, options = {}) => {

    const fetchSearchResults = () => {
        const options = {
            method: 'GET',
            url: 'https://movies-api14.p.rapidapi.com/search',
            params: {query: query},
            headers: {
                'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
            }
        };
        return axios.request(options)
    };

    const mergedOptions = {
        ...options
    }

    return useQuery({
        queryKey: ['search', query],
        queryFn: fetchSearchResults,
        ...mergedOptions
    });
};