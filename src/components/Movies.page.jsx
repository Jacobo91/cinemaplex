import { useAPI } from "../hooks/useAPI";
import { Hero, Error, Loader, Carousel } from './';
import { groupByGenre } from "../utils/groupByGenre";


export default function Movies() {

    const { isLoading, error, data } = useAPI(
        'movies',
        'movies',
        {
            refetchOnWindowFocus: false, 
            refetchOnMount: false,
        }
        );

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error}/>
    }
    
    const randomItem = Math.floor(Math.random() * 26);
    const heroMedia = data?.data?.movies[randomItem];

    const media = groupByGenre(data);

    return (
        <section
        className="movies"
    >

        <Hero  heroMedia={heroMedia}/>

        <main>
            {media?.map((mediaInfo, index) => {
                return (
                    <Carousel
                        key={mediaInfo.genre}
                        mediaInfo={mediaInfo.shows}
                        genre={mediaInfo.genre}
                        carouselId={index}
                    />
                )
            })}
        </main>

    </section>
    )
}
