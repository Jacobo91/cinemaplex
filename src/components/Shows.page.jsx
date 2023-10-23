import { useAPI } from "../hooks/useAPI";
import { Hero } from './'

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

    return (
        <section
            className="shows"
        >

            <Hero  heroMedia={heroMedia}/>

            <main>

            </main>

        </section>
    )
}
