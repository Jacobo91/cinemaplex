import { useAPI } from '../hooks/useAPI'
import { Link, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Carousel, Error, Loader } from './';

export default function Info() {

    const { path } = useParams()
    const arr = path.split('-')
    const type = arr[0]
    const id = arr[1]

    const {isLoading, error, data} = useAPI(
        type,
        `${type}/${id}`,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        },
        `${id}`
    )

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error}/>
    }
    console.log(data)

    return (
        <section
            className='info'
        >

            <div className="info-container">

                <div className="info__poster-container">
                    {/* <img src={data?.data?.[type]["poster_path"]} alt={`${data?.data?.[type]["title"]} poster`} /> */}
                    <LazyLoadImage 
                        src={data?.data?.[type]["poster_path"]}
                        alt={`${data?.data?.[type]["title"]} poster`}
                        effect='opacity'
                    />
                </div>

                <div className="info__text">
                    <h2>{data?.data?.[type]["title"]}</h2>
                
                    <Link
                        to={`/trailer/${`${type}-${data?.data?.[type]["_id"]} `}`}
                        className='btn'
                    >
                        <i className="fa-solid fa-play"></i> Trailer
                    </Link>

                    <div className="genres">
                    {[...new Set(data?.data?.[type].genres)].map((genre, i) => {
                        return <span key={i} className='genres'>{genre}</span>
                    })}
                    </div>

                    <div className="source">
                    {[...new Set(data?.data?.[type].sources)].map((source, i) => {
                        return <a 
                                    key={i} 
                                    className='source' 
                                    href={`https://www.${source.source.toLowerCase().replace("_", "")}.com`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {source.source.replace("_", " ")}
                                </a>
                    })}
                    </div>

                    <div className='info__rating flex'>
                        <Rating 
                            name='rating'
                            value={data?.data?.[type]["vote_average"] / 2}
                            precision={0.5}
                            readOnly
                        />
                        <p>{data?.data?.[type]["first_aired"]}</p>
                    </div>

                    <p>{data?.data?.[type]["overview"]}</p>

                </div>

            </div>

                {type === 'show' ? 
                    (
                        <main>
                            {data && data?.data?.["seasons"].map((element) => {
                                console.log(element)
                                return (
                                    <Carousel 
                                        key={element.season || element._id}
                                        mediaInfo={element.episodes || element}
                                        season={element.season || null}
                                    />
                                )
                            })}
                        </main>
                    ) : 
                type === "movie" ? (
                                <Carousel 
                                    key={data?.data?.movie._id}
                                    mediaInfo={data?.data?.similarMovies}
                                />
                ) : null
                }

        </section>
    )
}
