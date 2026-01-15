import { Routes, Route } from "react-router-dom";
import SignIn from "../Components/SignIn/Signin";
import PrivateRoute from "./PrivateRoute";
import MoviesApp from "../Components/MoviesApp";
import UpdateMovie from "../Components/pages/UpdateMovie";
import CreateMovie from "../Components/pages/CreateMoviePage";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MoviesApp />} />
        <Route path="/updatemovie" element={<UpdateMovie />} />
        <Route path="/createmovie" element={<CreateMovie />} />


      </Route>
    </Routes>
  );
};

export default PublicRoute;
