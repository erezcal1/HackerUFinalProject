import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthGuardRoute = ({ component: Page, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Page {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};
export default AuthGuardRoute;
