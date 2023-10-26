import { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import fallbackImage from "../assets/img-not-av.jpg";
import { Link } from "react-router-dom";

export default function Carousel({ mediaInfo, genre, carouselId }) {
const [scrollPosition, setScrollPosition] = useState(0);
const [isOverflowing, setIsOverflowing] = useState(false);
const carouselRef = useReducer(null);

const showsOrMovies = mediaInfo?.movies || mediaInfo;
const title = mediaInfo?.title || genre;

useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
        setIsOverflowing(carousel.scrollWidth > carousel.clientWidth);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [carouselId]);

return (
    <div className="carousel-wrapper">
        <h2>{title}</h2>
        <div className="carousel-inner-wrapper">
            <button onClick={() => {}} className={`${!isOverflowing ? "btn-off" : ""} bnt-previous`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div id={`carousel-${carouselId}`} className="carousel" ref={carouselRef}>
                {showsOrMovies.map((movie) => {
                    const image = movie.backdrop_path.endsWith("originalnull")
                        ? fallbackImage
                        : movie.backdrop_path;
                    return (
                        <Link
                            to={`/trailer/${`${movie.contentType}-${movie["_id"]} `}`} 
                            key={movie._id} 
                            className="carousel__image-wrapper"
                        >
                            <img src={image} alt={movie.title} />
                            <p className="carousel__card-title">
                                {movie.title}
                            </p>
                        </Link>
                    );
                })}
            </div>
            <button onClick={() => {}} className={`${!isOverflowing ? "btn-off" : ""} btn-next`}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>
);
}

Carousel.propTypes = {
        mediaInfo: PropTypes.shape({
        title: PropTypes.string,
        movies: PropTypes.array,
    }),
        genre: PropTypes.string,
        carouselId: PropTypes.number,
};
