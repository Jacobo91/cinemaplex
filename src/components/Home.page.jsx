import { useAPI } from "../hooks/useAPI";
import { Hero, Carousel } from './'

export default function Home() {


    const { isLoading, error, data } = useAPI(
        'home',
        'home',
        {refetchOnWindowFocus: false,}
        );

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <p>{error.message}</p>
    }


    const randomItem = Math.floor(Math.random() * 26);
    const heroMedia = data?.data[0].movies[randomItem];
    console.log(data)
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
