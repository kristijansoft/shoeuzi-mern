import { useLocation } from "react-router-dom";
import { matched } from "../router/route.util";
import routes from "../router/routes";

const useMatchRoute = () => {
  const location = useLocation();
  const pathname = location.pathname
    ? location.pathname
    : location.location.pathname;

  const matchedRoute = matched(pathname, routes);
  return {
    matchedRoute,
  };
};

export default useMatchRoute;
