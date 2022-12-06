import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/searchBar.component";
import ListComponent from "../../components/listSerach/listSearch.component";

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      axios
        .get("/song")
        .then((res) => {
          setSongs(res.data);
          setSearchResults(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    loadSongs();
  }, []);
  return (
    <Fragment>
      <SearchBar songs={songs} setSearchResults={setSearchResults} />
      <ListComponent searchResults={searchResults} />
    </Fragment>
  );
};
export default Search;
