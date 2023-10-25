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

const handleScroll = (direction) => {
    const carousel = carouselRef.current;
    const itemWidth = carousel.scrollWidth / showsOrMovies.length;
    let newPosition =
        direction === "left" ? scrollPosition - itemWidth : scrollPosition + itemWidth;

    if (newPosition < 0) {
        // Wrap around to the end if scrolling left from the beginning
        newPosition = carousel.scrollWidth - carousel.clientWidth;
    } else if (newPosition > carousel.scrollWidth - carousel.clientWidth) {
        // Wrap around to the beginning if scrolling right from the end
        newPosition = 0;
    }

    if (carousel) {
        // Use requestAnimationFrame for smooth scrolling
        const startTime = performance.now();
        const duration = 500; // Adjust the duration as needed
        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const position = scrollPosition + (newPosition - scrollPosition) * (elapsedTime / duration);
                carousel.scrollTo({
                    left: position,
                    behavior: "auto",
                });
                requestAnimationFrame(animateScroll);
            } else {
                carousel.scrollTo({
                    left: newPosition,
                    behavior: "auto",
                });
                setScrollPosition(newPosition);
            }
        };
        requestAnimationFrame(animateScroll);
    }
};


useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
        carousel.scrollTo({ left: 0 });
        setIsOverflowing(carousel.scrollWidth > carousel.clientWidth);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [carouselId]);

return (
    <div className="carousel-wrapper">
        <h2>{title}</h2>
        <div className="carousel-inner-wrapper">
            <button onClick={() => handleScroll("left")} className={`${!isOverflowing ? "btn-off" : ""} bnt-previous`}>
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
                            <span className="carousel__card-title">
                                {movie.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <button onClick={() => handleScroll("right")} className={`${!isOverflowing ? "btn-off" : ""} btn-next`}>
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
