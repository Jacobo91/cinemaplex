import { useParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { Loader, Error, Card }from "./";
import fallbackImage from "../assets/img-not-av.jpg";

function SearchResults() {

    const { searchTerm } = useParams();

    const { isLoading, error, data } = useSearch(
        searchTerm.toLowerCase(),
        {},
    );

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error}/>
    }
    console.log(data)
    return (
        <div className='search-results'>
            <h2>{data && data?.data?.contents.length > 0 ? `Results for ${searchTerm}:` : `No Results for ${searchTerm}`}</h2>
            <div className="search-results__gallery">
                {data && data?.data?.contents.map((movie) => {
                    const image = 
                    (movie.backdrop_path && movie.backdrop_path.endsWith("originalnull") || movie.backdrop_path.endsWith("originalundefined")) || 
                    ( movie.thumbnail_path && movie.thumbnail_path.endsWith("originalnull"))
                        ? fallbackImage
                        : movie.backdrop_path || movie.thumbnail_path;
                    return (
                                <Card 
                                    key={movie._id}
                                    contentType={movie.contentType}
                                    id={movie._id}
                                    title={movie.title}
                                    image={image}
                                    episodeNumber={movie.episode_number}
                                />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults