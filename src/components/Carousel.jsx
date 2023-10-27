import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import fallbackImage from "../assets/img-not-av.jpg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Carousel({ mediaInfo, genre, carouselId, season }) {

const [isOverflowing, setIsOverflowing] = useState(false);

const carouselRef = useRef(null);

const showsOrMovies = mediaInfo?.movies || mediaInfo;
const title = mediaInfo?.title || genre || season || "Similar Movies";

useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
        setIsOverflowing(carousel.scrollWidth > carousel.clientWidth);
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [carouselId]);


return (
    <div className="carousel-wrapper">
        <h2>{season ? `Season: ${season}` : title}</h2>
        <div className="carousel-inner-wrapper">
            <button onClick={() => {}} className={`${!isOverflowing ? "btn-off" : ""} bnt-previous`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            {/* Carousel */}
            <div id={`carousel-${carouselId}`} className="carousel" ref={carouselRef}>
                {showsOrMovies.map((movie) => {
                    const image = 
                    (movie.backdrop_path && movie.backdrop_path.endsWith("originalnull") || movie.backdrop_path.endsWith("originalundefined")) || 
                    ( movie.thumbnail_path && movie.thumbnail_path.endsWith("originalnull"))
                        ? fallbackImage
                        : movie.backdrop_path || movie.thumbnail_path;
                    return (
                        <Link
                            to={`/trailer/${`${movie.contentType}-${movie["_id"]} `}`} 
                            key={movie._id} 
                            className="carousel__image-wrapper"
                            
                        >
                            <LazyLoadImage
                                key={movie.title}
                                alt={movie.title}
                                src={image}
                                effect="blur"
                                className="carousel__img"
                            />
                            <p className="carousel__card-title">
                                <span className="episode">{movie.episode_number && `Episode ${movie.episode_number}:`}</span> {movie.title}
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
        season: PropTypes.number,
};
