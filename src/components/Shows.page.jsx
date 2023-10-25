import { useAPI } from "../hooks/useAPI";
import { groupByGenre } from "../utils/groupByGenre";
import { Hero } from './';
import { Carousel } from './';

export default function Shows() {

    const { isLoading, error, data } = useAPI(
        'shows',
        'shows',
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
            className="shows"
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
