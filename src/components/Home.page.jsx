import { useAPI } from "../hooks/useAPI";
import { Hero } from './'

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

    return (
            <section
                className="home"
            >

                <Hero  heroMedia={heroMedia}/>

                <main>

                </main>
            </section>
    )
}
