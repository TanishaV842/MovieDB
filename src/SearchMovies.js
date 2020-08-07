import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './index.scss';

export default function SearchMovies() {

   // states- input query, movies
   const [query, setQuery] = useState('');
   const [movies, setMovies] = useState([]);

   const SearchMovies = async (e) => {
      e.preventDefault();

      const url = `https://api.themoviedb.org/3/search/movie?api_key=afcccaa660310f7acad8cb2c1efe22bc&language=en-US&query=${query}&page=1&include_adult=false`;

      try {
         const res = await fetch(url);
         const data = await res.json();
         setMovies(data.results);
      } catch (err) {
         console.error(err);
      }
   }

   return (
      <React.Fragment>
         <form className="form" onSubmit={SearchMovies}>
            <label htmlFor="query" className="label">Movie Title</label>
            <input className="input" type="text" name="query" placeholder="Enter Movie Title"
               value={query} onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" type="submit">Search</button>
         </form>

         <div className="card-list" >
            {movies.filter(movie => movie.poster_path).map(movie => (
               <MovieCard movie={movie} key={movie.id} />
            ))}
         </div>
      </React.Fragment>
   )
}