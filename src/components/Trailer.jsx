import ReactPlayer from 'react-player'
import { useAPI } from '../hooks/useAPI'
import { Link, useParams } from 'react-router-dom'

export default function Trailer() {

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

    return (
        <section
            className='trailer'
        >
            <h1 className='trailer__title'>{data?.data?.[type].title}</h1>
            <div className="player-container">
                <ReactPlayer 
                    url={data?.data?.[type]["youtube_trailer"]}
                    controls
                    className="react-player"
                />
            </div>
            
            <div className='trailer__info flex'>
                <div className="trailer__info-genres">
                    {[...new Set(data?.data?.[type].genres)].map((genre, i) => {
                        return <span key={i} className='genres'>{genre}</span>
                    })}
                </div>
                <Link
                    to={`/info/${`${type}-${data?.data?.[type]["_id"]}`}`}
                    className="btn"
                >
                    <i className="fa-solid fa-circle-info"></i> Info
                </Link>
            </div>
        
        </section>
    )
}
