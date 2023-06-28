import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = () => {
  const navigate = useNavigate()
  return (
      isAuthenticated() ? <Outlet /> : navigate('/login')
);

};

export default PrivateRoute;