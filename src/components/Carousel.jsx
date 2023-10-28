import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import fallbackImage from "../assets/img-not-av.jpg";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Card from "./Card";

export default function Carousel({ mediaInfo, genre, carouselId, season }) {
const [scrollPosition, setScrollPosition] = useState(0);
const [isOverflowing, setIsOverflowing] = useState(false);
const carouselRef = useRef(null);

const showsOrMovies = mediaInfo?.movies || mediaInfo;
const title = mediaInfo?.title || genre;

const handleScroll = (direction) => {
    const carousel = carouselRef.current;
    const itemWidth = carousel.scrollWidth / showsOrMovies.length;
    let newPosition =
        direction === "left" ? scrollPosition - itemWidth : scrollPosition + itemWidth;

    if (newPosition < 0) {
        newPosition = carousel.scrollWidth - carousel.clientWidth;
    } else if (newPosition > (carousel.scrollWidth + itemWidth) - carousel.clientWidth) {
        newPosition = 0;
    }

    if (carousel) {
        const startTime = performance.now();
        const duration = 20;
        
        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const position = scrollPosition + (newPosition - scrollPosition) * (elapsedTime / duration);
                carousel.scrollTo({
                    left: position,
                    behavior: "smooth",
                });
                requestAnimationFrame(animateScroll);
            } else {
                carousel.scrollTo({
                    left: newPosition,
                    behavior: "smooth",
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
        setIsOverflowing(carousel.scrollWidth > carousel.clientWidth);
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [carouselId]);


return (
    <div className="carousel-wrapper">
        <h2>{season ? `Season: ${season}` : title}</h2>
        <div className="carousel-inner-wrapper">
            <button onClick={() => handleScroll("left")} className={`${!isOverflowing ? "btn-off" : ""} bnt-previous`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            {/* Carousel */}

            <div id={`carousel-${carouselId}`} className="carousel" ref={carouselRef}>
                {showsOrMovies.map((movie) => {
                    const image = 
                    (movie && 
                        (
                            (movie.backdrop_path && (movie.backdrop_path.endsWith("originalnull") || movie.backdrop_path.endsWith("originalundefined"))) ||
                            (movie.thumbnail_path && movie.thumbnail_path.endsWith("originalnull"))
                        ))
                            ? fallbackImage
                            : (movie.backdrop_path || movie.thumbnail_path);

                    return (
                                <Card 
                                    key={movie._id}
                                    contentType={movie.contentType}
                                    id={movie._id}
                                    title={movie.title}
                                    image={image}
                                    episodeNumber={movie.episode_number}
                                />
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
        season: PropTypes.number,
};
