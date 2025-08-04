// App.jsx
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import DirectorDetail from './components/DirectorDetail'
import ActorProfile from './components/ActorProfile' 
import './index.css' // Tailwind styles

function App() {
  return (
     
      <Routes>
        {/* Home: Movie list and filters */}
        <Route path="/" element={<Home />} />

        {/* Movie Details */}
        <Route path="/movies/:id" element={<MovieDetails />} />

        {/* Director Details */}
        <Route path="/directors/:name" element={<DirectorDetail />} />

        {/*  Actor Profile */}
        <Route path="/actors/:name" element={<ActorProfile />} />
      </Routes>
     
  )
}

export default App