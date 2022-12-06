import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import HomeSong from "../../components/homeSong/homeSong.component";

const UserLovedSongs = () => {
  const [userCards, setUserCards] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    getAllCards();
  }, []);

  const handleRemoveFave = (_id) => {
    let newArr = [...userCards];
    newArr = newArr.filter((song) => song._id !== _id);
    setUserCards(newArr);
  };

  const getAllCards = () => {
    axios
      .get(`/song/favorites/${userData.email}`)
      .then((res) => {
        if (res.data.length === 0) toast("You Have No Liked Songs");
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
          <HomeSong
            song={arrOfCards[i]}
            onRemoveFave={handleRemoveFave}
          ></HomeSong>
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
      <h1 className="text-center">My liked Songs</h1>
      {renderRowsFromArr(userCards)}
    </Fragment>
  );
};
export default UserLovedSongs;
