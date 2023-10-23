import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, 
        Movies, 
        Shows,
        Navbar,
        Trailer,
        Info} from './components'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/trailer/:path" element={<Trailer />} />
        <Route path="/Info/:path" element={<Info />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
