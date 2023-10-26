import { useAPI } from "../hooks/useAPI";
import { Hero, Carousel, Error, Loader } from './'

export default function Home() {


    const { isLoading, error, data } = useAPI(
        'home',
        'home',
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
    const heroMedia = data?.data[0].movies[randomItem];

    return (
            <section
                className="home"
            >

                <Hero  heroMedia={heroMedia}/>

                <main>
                    {data && data?.data?.map((mediaInfo) => {
                        return (
                            (
                                <Carousel 
                                    key={mediaInfo.title}
                                    mediaInfo={mediaInfo}
                                />
                            )
                        )
                    })}
                </main>
            </section>
    )
}
