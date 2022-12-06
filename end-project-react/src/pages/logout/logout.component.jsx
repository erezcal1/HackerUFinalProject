import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(authActions.logout()); //clear redux state
    localStorage.clear();
    history.push("/"); //navigate to home page
  }, []);

  return <></>;
};
export default LogOutPage;
