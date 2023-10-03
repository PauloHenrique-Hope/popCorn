
import { useEffect, useState } from 'react';
import './App.css';

// Assets
import popCorn from './assets/pop-corn.png'

const KEY =  "e2474972";

function App() {

  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleCloseTab(){
    if(showInfo => !showInfo)return;
  }

  useEffect(function(){
    async function fetchMovies(){

      // if(query.length < 3){
      //   setMovie([]);
      //   return;
      // }
      try{
      setIsLoading(true)

      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      
      if(!res.ok){
        throw new Error("Something went wrong with fetching movies");
      }

      
      const data = await res.json();
      
      // if(data.Response === "False"){
      //   throw new Error("Movie Not Found")
      // }

      console.log(data.Search);
      setMovie(data.Search);
     

    }catch(error) {
      setError(error.message);

    }finally  {
      setIsLoading(false)
    }
  }
    fetchMovies();
  }, [query, setMovie])

  return (
    <>
    <div className="App">
      <NavBar query = {query} setQuery = {setQuery}/>
    </div>
    <div className='Main-Container'>
      <Main movie = {movie} showInfo = {showInfo} onCloseTab = {handleCloseTab} isLoading={isLoading} error = {error}/>
    </div>
    </>
  );
}

function NavBar({query, setQuery}){
  return(
    <div className='NavBar'>
      
      <h1 className='Logo'>
      <img className='PopCorn' src={popCorn} alt="PopCorn" />
      usePopCorn</h1>
      <SearchBar query = {query} setQuery = {setQuery}/>
      <p>Found x movies</p>
    </div>
  )
}

function SearchBar({query, setQuery}){
  return(
    <div className='SearchBar'>
      <input type="text" placeholder='Search movie...' value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
  )
}

function Main({movie, showInfo, isLoading, error}){
  return(
    <div className='Main'>
      {isLoading && <Loading/>}
      {!isLoading && !error && <MoviesList movie = {movie}/>}
      {error && <NotFoundError message = {error}/>}
      <MoviesInfo showInfo = {showInfo}/>
    </div>
  )
}

function NotFoundError({message}){
  return(
    <div className='Loading'><p>{message}</p></div>
  )
}

function Loading(){
  return(
    <div className='Loading'>
      <p>Loading...</p>
    </div>
  )
}

function MoviesList({movie}){
  return(
    <div className='MoviesList'>
        {movie?.map (movie => (
          <MoviesCard movie={movie} key={movie.imdbID}/>
        ))}
    </div>
  )
}

function MoviesCard({movie}){
  return(
    <div className='MoviesCard'>
      <img src={movie.Poster} alt={movie.Title} />
      <div className='movie-container'>
        <p className='title'>{movie.Title}</p>
        <p className='year'>📅{movie.Year}</p>
      </div>
    </div>
  )
}

function NotFound(){
  return(
    <div>
      <p>not found</p>
    </div>
  )
}

function MoviesInfo({showInfo}){
  return(
    <div className='MoviesInfo'>
      {!showInfo ? (<MoviesWatched/>) : ("")}
      
    </div>
  )
}

function MoviesWatched(){
  return(
    <div className='MoviesWatched'>
        <p>MOVIES YOU WATCHED</p>
      <div className='stats-container'>
        <span>🎃0 movies</span>
         <span>⭐0</span>
         <span>⌛0 min</span>
      </div>
      
    </div>
  )
}

function Button({children, onCloseTab}){
  return(
    <button className='btn'>
      {children}
    </button>
  )
}

export default App;
