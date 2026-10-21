import { useEffect, useState } from "react";

function MovieDetails({ movie, onClose }) {
  const [request, setRequest] = useState(() => ({
    movieId: movie.imdbID,
    status: movie.imdbID ? "loading" : "done",
    details: null,
    error: "",
  }));

  useEffect(() => {
    if (!movie.imdbID) {
      return undefined;
    }

    const controller = new AbortController();

    async function loadDetails() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=eae6de7d`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Could not load movie details (${response.status}).`);
        }

        const result = await response.json();
        if (result.Response !== "True") {
          throw new Error(result.Error || "Could not load movie details.");
        }

        setRequest({
          movieId: movie.imdbID,
          status: "done",
          details: result,
          error: "",
        });
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setRequest({
            movieId: movie.imdbID,
            status: "error",
            details: null,
            error:
              loadError instanceof Error
                ? loadError.message
                : "Could not load movie details.",
          });
        }
      }
    }

    loadDetails();
    return () => controller.abort();
  }, [movie]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const requestMatchesMovie = request.movieId === movie.imdbID;
  const loading = Boolean(movie.imdbID) &&
    (!requestMatchesMovie || request.status === "loading");
  const details =
    requestMatchesMovie && request.details ? request.details : movie;
  const error = requestMatchesMovie ? request.error : "";
  const posterAvailable = details.Poster && details.Poster !== "N/A";

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-details-title"
        style={{
          boxSizing: "border-box",
          display: "flex",
          gap: "24px",
          width: "min(700px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "24px",
          border: "1px solid #e3e3e3",
          borderRadius: "14px",
          backgroundColor: "#fff",
          color: "#222",
          boxShadow: "0 7px 18px rgba(0, 0, 0, 0.12)",
        }}
      >
        {posterAvailable && (
          <img
            src={details.Poster}
            alt={`${details.Title} poster`}
            style={{
              alignSelf: "flex-start",
              width: "180px",
              maxWidth: "35%",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            id="movie-details-title"
            style={{ margin: "0 0 8px", color: "#222" }}
          >
            {details.Title}
          </h2>
          <p style={{ marginBottom: "16px", color: "#666" }}>
            {[details.Year, details.Rated, details.Runtime]
              .filter((value) => value && value !== "N/A")
              .join(" · ")}
          </p>

          {loading && <p>Loading movie details...</p>}
          {error && (
            <p role="alert" style={{ marginBottom: "16px", color: "#a00" }}>
              {error}
            </p>
          )}
          {!loading && !error && (
            <div style={{ display: "grid", gap: "10px" }}>
              {[
                ["Plot", details.Plot],
                ["Genre", details.Genre],
                ["Director", details.Director],
                ["Cast", details.Actors],
                ["Released", details.Released],
                ["Rating", details.imdbRating],
              ]
                .filter(
                  ([, value]) => value && value !== "N/A",
                )
                .map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value}
                  </p>
                ))}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{ marginTop: "20px" }}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;
