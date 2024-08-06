import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieSearch from './components/movies/MovieSearch';
import MovieList from './components/movies/MovieList';
import MovieDetails from './components/movies/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;