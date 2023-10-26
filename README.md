# Cinemaplex

- App to discover what to watch and its source, you can check info and trailer.

## Technologies Used:

- React
- React Router Dom
- Tanstack Query
- React Lazy load image component
- Axios 
- React Player
- Material UI

### Tanstack Query

Its neing used for better API calls and easy cache, all components that use it have the refetchOnMount:false property and refetchOnBackground: false to avoid doing many calls to the API. pages dont need to constinously check for changes in the API so this approach was taken, also Info and Trailer component call the same endpoint so refetchOnMount:false was used because after calling this endpoint once both Info and Trailer can use the data in the cache to have a better user experience.

 - home, movies, shows, info and trailer: first info fetched is used and stored in cache for 5 mins so the app dont refetch everytime the users go back to home and the user also have a better experience. (after the cache is garbage collected if the user goes into a component that calls an API it will refetch giving us updated content if it exists)

 ## React Lazy Loading Image/Component

 - Its use to improve speed and user experience, so only thing in viewport are load, also helps improve initial loading.

 
