import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, 
        Movies, 
        Shows,
        Navbar  } from './components'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
