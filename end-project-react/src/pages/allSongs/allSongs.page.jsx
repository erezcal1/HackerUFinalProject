import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import HomeSong from "../../components/homeSong/homeSong.component";
import { toast } from "react-toastify";
import "./allSongs.css";

const AllSongs = () => {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    getAllCards();
  }, []);

  const getAllCards = () => {
    axios
      .get(`/song`)
      .then((res) => {
        if (res.data.length === 0) toast("You Have Liked Songs");
        else setUserCards(res.data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("cannot get Songs", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const renderRowsFromArr = (arrOfCards) => {
    let newArr = [];
    let inArr = [];
    let length = arrOfCards.length;
    for (let i = 0; i < length; i++) {
      if (i > 0 && i % 3 === 0) {
        newArr = [
          ...newArr,
          <div className="row" key={i + "cards row"}>
            {[...inArr]}
          </div>,
        ];
        inArr = [];
      }
      inArr = [
        ...inArr,
        <div key={arrOfCards[i]._id} className="col">
          <HomeSong song={arrOfCards[i]}></HomeSong>
        </div>,
      ];
    }
    if (inArr.length > 0) {
      newArr = [
        ...newArr,
        <div className="row" key={length + "cards row"}>
          {[...inArr]}
        </div>,
      ];
    }
    return newArr;
  };
  return (
    <Fragment>
      <h2 className="text-center">Songs</h2>
      {renderRowsFromArr(userCards)}
      <div className="text-center sign-up">
        <h2 className="text-center">Why you should SignUp</h2>
        <h3>
          would you like to stop searching for songs that you love? <br /> would
          you like to get access to song lyrics and artist by ease?
        </h3>
        <h4>
          Then SignUp right now and tart remembering where all your loved songs
          are!!!!
        </h4>
      </div>
    </Fragment>
  );
};
export default AllSongs;
