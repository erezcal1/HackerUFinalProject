import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HomeSong from "../../components/homeSong/homeSong.component";

const OneSong = () => {
  const { song } = useParams();
  const [songFromServer, setSongFromServer] = useState({});

  useEffect(() => {
    getSong();
  }, []);

  const getSong = () => {
    axios
      .get(`/song/${song}`)
      .then((res) => {
        if (res.data.length === 0) toast("no song found");
        else setSongFromServer(res.data);
      })
      .catch((e) => {
        console.log("error get one song", e);
      });
  };

  return (
    <Fragment>
      <h1>{song.name}</h1>
      {songFromServer && (
        <div>
          <HomeSong song={songFromServer}></HomeSong>;
        </div>
      )}
      ;
    </Fragment>
  );
};

export default OneSong;
