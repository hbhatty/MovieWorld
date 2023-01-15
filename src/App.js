import {useEffect, useState} from "react";
import MovieCard from "./MovieCard";

import "./App.css"
import SearchIcon from "./search.svg"

//f0ddbda5
const API_URL = `http://www.omdbapi.com/?apikey=f0ddbda5&`;

const movie1 = {
        "Title": "Batman: The Animated Series",
        "Year": "1992–1995",
        "imdbID": "tt0103359",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
    }

//main func component
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    //async takes some time
    const searchMovies = async (movieName) => {
        //gets the response from API
        const response = await fetch(`${API_URL}s=${movieName}`);
        //this is the data we get from the api
        const data = await response.json();
        setMovies(data.Search);
    }

    //runs once
    useEffect(() => {
        searchMovies("Batman")
    }, []);

    return(
        <div className="app">
            <h1>MovieWorld</h1>

            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <img
                  src = {SearchIcon}
                  alt = "search"
                  onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                    {/* loop through and passes the movie as a prop to the card */}
                    {movies.map((movie) => (
                        <MovieCard movie = {movie} />
                    ))}
                    </div>
                ) : (
                    <div className="empty">
                    <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;