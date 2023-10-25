
export function groupByGenre(data) {

    const arrangedData = {};

    data?.data?.movies.forEach((element) => {
        element.genres.forEach((genre) => {
            if (!arrangedData[genre]) {
                arrangedData[genre] = []
            }

            arrangedData[genre].push(element)
        })
    });

    const results = Object.keys(arrangedData).map((genre) => ({
        genre: genre.toLowerCase(),
        shows: [...new Set(arrangedData[genre].map((show) => show.title))].map(
            (uniqueTitle) => {
                return arrangedData[genre].find((show) => show.title === uniqueTitle);
            }
        ),
    }));


    return results;
}