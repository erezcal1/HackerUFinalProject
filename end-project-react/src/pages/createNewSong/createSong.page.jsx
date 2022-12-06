import { Fragment, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import songSchema from "../../validation/songSchema.validation.jsx";
import { useHistory } from "react-router-dom";

const CreateSongPage = () => {
  const [song_Name, setSongName] = useState("");
  const [song_Description, setSongDescription] = useState("");
  const [song_Lyric, setSong_Lyric] = useState("");
  const [song_Artist, setSong_Artist] = useState("");
  const [song_Image, setSong_Image] = useState("");

  const history = useHistory();

  const handle_song_Name_Change = (event) => {
    setSongName(event.target.value);
  };
  const handle_song_Description_Change = (event) => {
    setSongDescription(event.target.value);
  };
  const handle_song_Lyric = (event) => {
    setSong_Lyric(event.target.value);
  };
  const handle_song_Artist_Change = (event) => {
    setSong_Artist(event.target.value);
  };
  const handle_song_Image_Change = (event) => {
    setSong_Image(event.target.value);
  };
  const handle_Submit = (event) => {
    event.preventDefault();
    const validated_Value = Joi.validate(
      {
        name: song_Name,
        description: song_Description,
        lyric: song_Lyric,
        artist: song_Artist,
      },
      songSchema,
      { abortEarly: false }
    );
    const { error } = validated_Value;
    if (error) {
      console.log(error);
      for (let item of error.details) {
        toast.error(`${item.message.replaceAll('"', "")}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      let dateToSend = {
        name: song_Name,
        description: song_Description,
        lyric: song_Lyric,
        artist: song_Artist,
      };
      if (song_Image) {
        dateToSend.song_Image = song_Image;
      }
      console.log(dateToSend);
      axios
        .post("/song", dateToSend)
        .then((res) => {
          console.log(res.data);
          toast.success("🦄 Card Created", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/");
        })
        .catch((err) => console.log("error form axios", err));
    }
  };
  return (
    <Fragment>
      <h1 className="text-center">Create Business Card</h1>
      <form className="row g-3" onSubmit={handle_Submit}>
        <div className="col-md-6">
          <label htmlFor="input_biz_Name" className="form-label">
            Song Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="input_biz_Name"
            value={song_Name}
            onChange={handle_song_Name_Change}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="input_biz_Description" className="form-label">
            Song Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="input_biz_Description"
            value={song_Description}
            onChange={handle_song_Description_Change}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="input_biz_Address" className="form-label">
            Song Lyrics:
          </label>
          <input
            type="text"
            className="form-control"
            id="input_biz_Address"
            value={song_Lyric}
            onChange={handle_song_Lyric}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="input_biz_Phone" className="form-label">
            Song Artist:
          </label>
          <input
            type="text"
            className="form-control"
            id="input_biz_Phone"
            value={song_Artist}
            onChange={handle_song_Artist_Change}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="input_biz_Image" className="form-label">
            Song Image (Not required)
          </label>
          <input
            type="text"
            className="form-control"
            id="input_biz_Image"
            value={song_Image}
            onChange={handle_song_Image_Change}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            create Song
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default CreateSongPage;
