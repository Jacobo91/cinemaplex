import { PropTypes } from "prop-types"
import  fallbackImage from "../assets/img-not-av.jpg"


export default function Carousel({ mediaInfo, genre }) {

    const showsOrMovies = mediaInfo?.movies ? mediaInfo?.movies : mediaInfo
    const title = mediaInfo?.title ? mediaInfo?.title : genre
    return (
        <div className="carousel-wrapper">
            <h2>{title}</h2>
            <div className="carousel">
                    {showsOrMovies.map((movie) => {
                        const image = movie.backdrop_path.endsWith("originalnull") ? fallbackImage : movie.backdrop_path
                        return (
                            <div key={movie._id} className="carousel__image-wrapper">
                                <img 
                                    src={image} 
                                    alt={movie.title} 

                                /> 
                                <span className="carousel__card-title">
                                    {`${movie.title.length > 27 ? `${movie.title.substring(0, 28)} ...` : movie.title}`}
                                </span>
                            </div>
                        )
                    }                          
                    )}
            </div>
        </div>
    )
}

Carousel.propTypes = {
    mediaInfo: {title: PropTypes.string, movie: PropTypes.array},
    genre: PropTypes.string
}

/*

            <div className="carousel__controls">
                <button>Back</button>
                <button>Next</button>
            </div>

*/
