import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import EditSongCard from "../../components/editSongCard/editSongCard.component";
import EditSongCardComponent from "../../components/editSong/editSongCard.component";

const EditSongPage = () => {
  const [userCards, setUserCards] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    getAllCards();
  }, []);

  const handle_Edit_Song = (_id, updatedCard) => {
    axios
      .put(`/song/${_id}`, updatedCard)
      .then((res) => {
        let newArrCards = cloneDeep(userCards);
        let cardItemIndex = newArrCards.findIndex((item) => item._id === _id);
        if (cardItemIndex !== -1) {
          newArrCards[cardItemIndex] = { ...cloneDeep(updatedCard), _id };
          setUserCards(newArrCards);
        }
        setDataToEdit(null);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const onEditSong = (id) => {
    let temp = cloneDeep(userCards.find((card) => card._id === id));
    setDataToEdit(temp);
  };
  const onCancelEdit = () => {
    setDataToEdit(null);
  };

  const onDeleteSong = (id) => {
    axios
      .delete(`/song/${id}`)
      .then((res) => {
        let newArray = cloneDeep(userCards);
        setUserCards(newArray.filter((card) => card._id !== id));
      })
      .catch((error) => {
        console.log(error);
        toast.error("cannot delete the selected card", {
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
          <EditSongCard
            song={arrOfCards[i]}
            onDeleteSong={onDeleteSong}
            onEditSong={onEditSong}
          ></EditSongCard>
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
      {dataToEdit && (
        <EditSongCardComponent
          onCancelEdit={onCancelEdit}
          onEditSong={handle_Edit_Song}
          {...dataToEdit}
        ></EditSongCardComponent>
      )}
    </Fragment>
  );
};
export default EditSongPage;
