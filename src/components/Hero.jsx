import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

const HeroMediaProps = {
    _id: PropTypes.string,
    backdrop_path: PropTypes.string,
    genres: PropTypes.array,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    contentType: PropTypes.string,
}

export default function Hero ({ heroMedia }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [windowWidth])


    return (
        <header
            className="hero"
        >
            <img
                src={heroMedia["backdrop_path"]}
                alt={`${heroMedia.contentType} ${heroMedia.title} image`}
                loading="lazy"
            />
            <div className="hero-info flex">
                <h2 className="hero_content-type">{heroMedia.contentType}</h2>
                <div className="hero__text-container flow-content flow-content--large">
                    <span className="hero-title">
                        {`${heroMedia.title.length > 16 ? heroMedia.title.slice(0, 18) + "..." : heroMedia.title}`}
                    </span>

                    {windowWidth > 800 && (<p className="hero-text" >
                        {`${heroMedia.overview.length > 200 ? heroMedia.overview.slice(0, 201) + "..." : heroMedia.overview}`}
                    </p>)}

                    <div className="hero-btns">
                        {/* ${heroMedia.contentType}/${heroMedia["_id"]} */}
                        <Link
                            to={`/trailer/${`${heroMedia.contentType}-${heroMedia["_id"]} `}`}
                            className="btn"
                        >
                            <i className="fa-solid fa-play"></i> Trailer
                        </Link>
                        <Link
                            to={`/info/${`${heroMedia.contentType}-${heroMedia["_id"]} `}`}
                            className="btn"
                        >
                            <i className="fa-solid fa-circle-info"></i> Info
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

Hero.propTypes = {
    heroMedia: PropTypes.shape(HeroMediaProps).isRequired
}