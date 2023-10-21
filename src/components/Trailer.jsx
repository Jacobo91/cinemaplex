import ReactPlayer from 'react-player'
import { useAPI } from '../hooks/useAPI'
import { useParams } from 'react-router-dom'

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

    const { movie, similarMovies } = data;

    return (
        <section
            className='trailer'
        >
            <h1>{data?.data?.movie.title}</h1>
            <div className="player-container">
                <ReactPlayer 
                    url={data?.data?.movie["youtube_trailer"]}
                    controls
                    className="react-player"
                />
            </div>
            

        
        </section>
    )
}
