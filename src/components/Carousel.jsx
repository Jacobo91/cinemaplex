import { PropTypes } from "prop-types"

const CarouselProps = {
    title: PropTypes.string,
    movies: PropTypes.array
}

export default function Carousel({ mediaInfo }) {
    return (
        <div className="carousel-wrapper">
            <h2>{mediaInfo.title}</h2>
            <div className="carousel">
            <img src="" alt="" />
            <div className="carousel__controls">
                <button>Back</button>
                <button>Next</button>
            </div>
            </div>
        </div>
    )
}

Carousel.propTypes = {
    mediaInfo: PropTypes.shape(CarouselProps).isREquired
}

