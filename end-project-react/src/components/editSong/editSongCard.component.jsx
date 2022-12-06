import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./editSongCardPopup.css";

const EditSongCardComponent = (props) => {
  const [song_Name, setSongName] = useState(props.name);
  const [song_Description, setSongDescription] = useState(props.description);
  const [song_Lyric, setSong_Lyric] = useState(props.lyrics);
  const [song_Artist, setSong_Artist] = useState(props.artist);
  const [song_Image, setSong_Image] = useState(props.image);

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
  };
  const handleFromClick = (event) => {
    event.stopPropagation();
  };
  const handle_Submit_Edit = () => {
    let dateToSend = {
      name: song_Name,
      description: song_Description,
      lyric: song_Lyric,
      artist: song_Artist,
    };
    if (song_Image) {
      dateToSend.song_Image = song_Image;
    }
    props.onEditCard(props._id, dateToSend);
  };
  const handle_Cancel = () => {
    props.onCancelEdit();
  };
  return (
    <div className="center-wrapper" onClick={handle_Cancel}>
      <form
        onSubmit={handle_Submit}
        onClick={handleFromClick}
        className="center-absolute"
      >
        <div className="mb-3">
          <h3>Edit Song</h3>
        </div>
        <div className="md-3">
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
        <div className="md-3">
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
        <div className="md-3">
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

        <div className="md-3">
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
        <div className="md-3 mb-3">
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

        {/* Buttons */}
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handle_Submit_Edit}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-danger w-100"
              onClick={handle_Cancel}
            >
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditSongCardComponent;
