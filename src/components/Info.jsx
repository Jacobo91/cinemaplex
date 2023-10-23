import { useAPI } from '../hooks/useAPI'
import { Link, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';

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
        },
        `${id}`
    )

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <p>{error.message}</p>
    }
    console.log(data)
    return (
        <section
            className='info'
        >

            <div className="info-container">

                <div className="info__poster-container">
                    <img 
                        src={data?.data?.[type]["poster_path"]} 
                        alt={`${data?.data?.[type]["title"]} poster`} 
                    />
                </div>

                <div className="info__text">
                    <h2>{data?.data?.[type]["title"]}</h2>

                    <div className="genres">
                    {[...new Set(data?.data?.[type].genres)].map((genre, i) => {
                        return <span key={i} className='genres'>{genre}</span>
                    })}
                    </div>

                    <div className="source">
                    {[...new Set(data?.data?.[type].sources)].map((source, i) => {
                        return <span key={i} className='source'>{source.source}</span>
                    })}
                    </div>

                    <div className='info__rating flex'>
                        <Rating 
                            name='rating'
                            value={data?.data?.[type]["vote_average"] / 2}
                            precision={0.5}
                        />
                        <p>{data?.data?.[type]["first_aired"]}</p>
                    </div>

                    <p>{data?.data?.[type]["overview"]}</p>

                </div>

            </div>

            <div className="info__similar-media">

            </div>

        </section>
    )
}
