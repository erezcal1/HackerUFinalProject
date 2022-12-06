import { Fragment } from "react";
import "./editSongs.css";

const EditSongCard = ({ song, onDeleteSong, onEditSong }) => {
  const handleBtnDelete = () => {
    onDeleteSong(song._id);
  };
  const handleBtnEdit = () => {
    onEditSong(song._id);
  };
  return (
    <Fragment>
      <div className="col mb-4">
        <div className="card border-0">
          <div className="card-body">
            <h5 className="card-title">{song.name}</h5>
            <h5>{song.artist}</h5>
            <h6 className="card-prev-text">{song.description}</h6>
            <button className="btn btn-warning" onClick={handleBtnEdit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleBtnDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default EditSongCard;
