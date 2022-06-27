import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if(loading) return <h1>loading</h1>

    if(!user) return <NavLink to="/login"></NavLink>

    return <>{children}</>

}

export default ProtectedRoute;