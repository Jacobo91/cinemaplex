
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
        shows: arrangedData[genre]
    }))

    return results;
}