import { useAPI } from "../hooks/useAPI";
import { Hero } from './';
import { groupByGenre } from "../utils/groupByGenre";
import { Carousel } from './';

export default function Movies() {

    const { isLoading, error, data } = useAPI(
        'movies',
        'movies',
        {refetchOnWindowFocus: false,}
        );

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <p>{error.message}</p>
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
            {media?.map((mediaInfo) => {
                return (
                    <Carousel
                        key={mediaInfo.genre}
                        mediaInfo={mediaInfo.shows}
                        genre={mediaInfo.genre}
                    />
                )
            })}
        </main>

    </section>
    )
}
