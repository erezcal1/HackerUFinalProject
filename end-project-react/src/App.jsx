import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthGuardRoute from "./components/authGuardRoute/authGuardRuote.component";
import Navbar from "./components/navbar/navbar.component";
import LoginPage from "./pages/loginPage/login.page";
import UserLovedSongs from "./pages/lovedSongs/lovedSongs.page";
import PrivacyPolicy from "./pages/privacy/privacy.page";
import RegisterUserPage from "./pages/registerUser/registerUser.page";
import CreateSongPage from "./pages/createNewSong/createSong.page";
import LogOutPage from "./pages/logout/logout.component";
import AllSongs from "./pages/allSongs/allSongs.page";
import ForgetPassPage from "./pages/forgetPassEmail/forgetPassEmail.page";
import OneSong from "./pages/oneSong/oneSong.page";
import Search from "./pages/search/search.page";
import AboutPage from "./pages/about/about.page";
import EditSongPage from "./pages/editSongs/editSongs.page";

function App() {
  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route path="/" exact>
          <AllSongs />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/forgetPass">
          <ForgetPassPage />
        </Route>
        <Route path="/user-register">
          <RegisterUserPage />
        </Route>
        <AuthGuardRoute
          path="/createSong"
          component={CreateSongPage}
        ></AuthGuardRoute>
        <AuthGuardRoute
          path="/editSongs"
          component={EditSongPage}
        ></AuthGuardRoute>
        <Route path="/song/:song">
          <OneSong />
        </Route>
        <Route path="/love">
          <UserLovedSongs />
        </Route>
        <Route path="/create-song">
          <CreateSongPage />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/privacy">
          <PrivacyPolicy />
        </Route>
        <Route path="/logout">
          <LogOutPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
