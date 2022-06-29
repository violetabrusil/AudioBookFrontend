import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext"

function Home() {

    const { user, logout, loading } = useAuth();
    console.log('user google', user);
    const navigate = useHistory();

    const handleLogout = async () => {
        await logout();
        navigate.push('/login');
    }

    if (loading) return <h1>Loading</h1>

    return (
        <div>
            <h1>Bienvenido { user.displayName|| user.email}</h1>
            <button onClick={handleLogout}>Salir</button>
        </div>
    )
}

export default Home;