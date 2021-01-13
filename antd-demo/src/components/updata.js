import React from "react";
import { Link } from "react-router-dom";

import "./styles/updata.css";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { API_KEY, IMAGE_URL } from "../keys";

const Updata = (props) => {
  React.useEffect(() => {
    callingApi();
  }, []);

  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState(0);
  const [popularity, setPopularity] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [actorImage, setActorImage] = React.useState("");

  const callingApi = async () => {
    const actorName = props.history.location.state.actorName;
    const apiDetailsUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=es&query=${actorName.replace(
      " ",
      "+"
    )}`;
    const response = await fetch(apiDetailsUrl);
    const data = await response.json();
    console.log(data);
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
        <img src={actorImage} alt="Actor/Actriz" />
        <h2>{name}</h2>
        <div>{gender === 1 ? "Mujer" : "Hombre"}</div>
        <p>{popularity}</p>
      </div>
      <div className="tittle">
        <h1>Películas:</h1>
      </div>
      {movies.length > 0 ? (
        movies.map((movie) => {
          return (
            <div key={movie.id}>
              <img
                src={IMAGE_URL + movie.poster_path}
                alt=""
                width={100}
                height={100}
              />
              <div className="title">{movie.title}</div>
            </div>
          );
        })
      ) : (
        <p>No tiene peliculas</p>
      )}
    </div>
  );
};

export default Updata;
