import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";
import Card from "../components/ui/card.jsx";
import MovieDetails from "../components/ui/MovieDetails.jsx";
import "./movie.css";
import Formdata from "./formdata.jsx";

function Movie() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [addedMovies, setAddedMovies] = useState([]);
  const [hello, setHello] = useState("batman");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchload() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${hello}&page=${page}&apikey=eae6de7d`,
        );
        // const res= await fetch( `http://www.omdbapi.com/?i=tt3896198&apikey=eae6de7d`);
        console.log("HTTP Status Code:", res.status);

        const data = await res.json();
        4;
        setData(data.Search ?? []);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log("Errorrrrrrrrrrrrrrrrrrr", error);
      } finally {
        setLoading(false);
      }
    }

    fetchload();
  }, [page, count]);

  const event = (e) => {
    setHello(e.target.value);
  };

  // const world =setTimeout((e)=>{setSearching(e.target.value)},4)

  const render = () => setCount(count + 1);
  const addMovie = (newMovie) => {
    const allMovies = [...data, ...addedMovies, newMovie];
    console.log("Movies after adding:", allMovies);
    setAddedMovies((movies) => [...movies, newMovie]);
  };
  const displayedMovies = [...data, ...addedMovies];

  return (
    <>
    

    <div style={{ display: "flex", flexDirection: "column" }}>
      <header>
        Movies
        <input
          className="search"
          type="text"
          value={hello}
          onChange={event}
          placeholder="Search"
        />
        <button
          style={{ margin: "0px", padding: "10px", height: "45px" }}
          onClick={render}
        >
          search
        </button>
      </header>
      <div className="contain">
        {loading ? (
          <Commet color="#6b6b6b" size="medium" text="" textColor="" />
        ) : (
          displayedMovies?.map((item, key) => {
            return (
              <div className="parts" key={key}>
                <Card
                  title={item.Title}
                  year={item.Year}
                  imageUrl={item.Poster}
                  onView={() => setSelectedMovie(item)}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="pagenext">
        <button onClick={() => setPage((page) => page - 1)}>Previous</button>
        <h1>{page}</h1>
        <button onClick={() => setPage((page) => page + 1)}>Next</button>
      </div>
    </div>
 


    <Formdata onAddMovie={addMovie} />

    {selectedMovie && (
      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    )}

    </>

);
}

export default Movie;
