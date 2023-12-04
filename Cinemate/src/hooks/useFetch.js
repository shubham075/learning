import { useEffect, useState } from "react"


export const useFetch = (apiPath, queryTerm = '') => {
    const [data, setData] = useState([]);
    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.results);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchMovie();
    }, [url]);

    return { data }
}
