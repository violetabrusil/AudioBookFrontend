import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext"

function Home() {

    const { user } = useAuth();
    const navigate = useHistory();

    // const handleLogout = async () => {
    //     await logout();
    //     navigate('');
    // }
    return (
        <div>
            <h1>Bienvenido {user.userName}</h1>
            {/* <button onClick={() => signOut(auth)}>Salir</button> */}
        </div>
    )
}

export default Home;