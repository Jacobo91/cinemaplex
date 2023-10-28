import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

function Card({
    contentType, 
    id,
    title,
    image,
    episodeNumber
}) {
    return (
        <Link
        to={`/trailer/${`${contentType}-${id} `}`} 
        className="carousel__image-wrapper"
        
    >
        <LazyLoadImage
            key={title}
            alt={title}
            src={image}
            effect="blur"
            className="carousel__img"
        />
        <p className="carousel__card-title">
            <span className="episode">{episodeNumber && `Episode ${episodeNumber}:`}</span> {title}
        </p>
    </Link>
    )
}

export default Card

Card.propTypes = {
    contentType: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    episodeNumber: PropTypes.number,
}