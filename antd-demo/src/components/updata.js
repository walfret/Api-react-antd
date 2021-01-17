import React from "react";
import { Link } from "react-router-dom";

import "./styles/updata.css";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { API_KEY, IMAGE_URL } from "../keys";
import star from "../estrella.svg";

const Updata = (props) => {
  React.useEffect(() => {
    callApi();
  }, []);

  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState(0);
  const [popularity, setPopularity] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [actorImage, setActorImage] = React.useState("");

  const callApi = async () => {
    const actorName = props.history.location.state.actorName;
    const apiDetailsUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName.replace(
      " ",
      "+"
    )}`;
    const response = await fetch(apiDetailsUrl);
    const data = await response.json();

    setName(data.results[0].name);
    setGender(data.results[0].gender);
    setPopularity(data.results[0].popularity);
    setMovies(data.results[0].known_for);
    setActorImage(IMAGE_URL + data.results[0].profile_path);
  };

  return (
    <div className="container-update">
      <div className="container-btn">
        <Button type="primary" icon={<ArrowLeftOutlined />}>
          <Link to="/" className="button">
            Regresar
          </Link>
        </Button>
      </div>
      <div className="container-act">
        <img src={actorImage} alt="Actor/Actriz" width={125} height={188} />
        <h2>{name}</h2>
        <div className="gender">{gender === 1 ? "Mujer" : "Hombre"}</div>
        <h3>Popularidad: {popularity}</h3>
      </div>
      <div className="peli">
        <h1>Películas:</h1>
      </div>
      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <div className="movies" key={movie.id}>
                <div>
                  <div className="movie-title">
                    <h2 className="movie-title">{movie.title}</h2>
                  </div>
                  <img
                    className="img-movie"
                    src={IMAGE_URL + movie.poster_path}
                    alt="Peli"
                    width={100}
                    height={150}
                  />
                </div>
                <div>
                  <p>{movie.overview}</p>
                  <h3>Fecha de estreno: {movie.release_date}</h3>
                </div>
                <div className="qualification">
                  <h4>{movie.vote_average}/10</h4>
                  <img src={star} alt="star" width={15} height={15} />
                </div>
              </div>
            );
          })
        ) : (
          <p>No tiene peliculas</p>
        )}
      </div>
    </div>
  );
};

export default Updata;
