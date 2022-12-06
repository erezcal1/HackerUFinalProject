import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./homeSong.css";
import Joi from "joi-browser";
import songSchema from "../../validation/songSchema.validation";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const HomeSong = ({ song, onRemoveFave }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.favorite && userData.favorite[0]) {
      if (userData.favorite.find((favorite) => favorite._id === song._id)) {
        console.log(userData.favorite);
        setFavorite(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    console.log(song, "song");
    console.log(userData, "user");
  }, []);
  // useEffect(() => {
  //   if (favorite) {
  //     setFavorite(false);
  //   } else {
  //     setFavorite(true);
  //   }
  // }, [userData]);

  const addToFavorite = () => {
    const validate_Song = Joi.validate(
      {
        name: song.name,
        description: song.description,
        lyric: song.lyric,
        artist: song.artist,
      },
      songSchema,
      { abortEarly: false }
    );
    const { error } = validate_Song;
    if (error) {
      console.log(error, "error favorites");
      toast.error({
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (favorite) {
        axios
          .put("/song/favorites/remove", {
            song: song,
            email: userData.email,
          })
          .then(() => {
            dispatch(
              authActions.updateUserData({
                ...userData,
                favorite: userData.favorite.filter(
                  (favorite) => favorite._id !== song._id
                ),
              })
            );
            setFavorite(false);
            onRemoveFave(song._id);
          })
          .catch((e) => console.log(e));
      } else {
        axios
          .put("/song/favorites/add", { song: song, email: userData.email })
          .then(() => {
            dispatch(
              authActions.updateUserData({
                ...userData,
                favorite: userData.favorite.filter(
                  (favorite) => favorite._id !== song._id
                ),
              })
            );
            toast.success({
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFavorite(true);
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <Fragment>
      <div className="col mb-4">
        <div className="card border-0">
          <Link to={`/song/${song.name}`} className="link-card">
            <div className="card-body">
              <h5 className="card-title">{song.name}</h5>
              <h5>{song.artist}</h5>
              <h6>{song.description}</h6>
              <p className="card-text">{song.lyrics}</p>
            </div>
          </Link>
          <FontAwesomeIcon
            className={`${favorite ? "text-success" : "text-warning"} `}
            icon={faStar}
            onClick={addToFavorite}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default HomeSong;
