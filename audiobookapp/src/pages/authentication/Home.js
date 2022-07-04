import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"
import { doc, getDoc } from "firebase/firestore"
import db, {app} from "../../multimedia"
import UserManager from "../informationUser/UserManager";
import AudioBooksList from "../audioBook/AudioBookList";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

function Home() {

    const { user, logout } = useAuth();
    const navigate = useHistory();
    const [userCurrent, setUserCurrent] = useState({
        email: "",
        photo: "",
        rol: "",
        userName: "",
        access: "",
    }
    );
    const auth = getAuth(app);

    //Función para salir del sistema
    const handleLogout = async () => {
        await logout();
        navigate.push('/login');
    }

    useEffect(() => {
        getDataUser();
    }, [user, logout]);

    //Función para obtener los datos de los usuarios registrados
    const getDataUser = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("existe", docSnap.data())
                setUserCurrent(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }

    }

    if (userCurrent.userName) {

        if (userCurrent.access === "true") {
            if (userCurrent.rol === "admin") {
                return (
                    <div>
                        <h1>Bienvenido {userCurrent.userName}</h1>
                        <button onClick={handleLogout}>Salir</button>
                        <UserManager />
                    </div>
                )
            } if (userCurrent.rol === "author") {
                return (
                    <div>
                        <h1>Bienvenido {userCurrent.userName}</h1>
                        <button onClick={handleLogout}>Salir</button>
                        <Link className="btn btn-info" to={'/editProfile'}>Editar perfil</Link>
                        <AudioBooksList />
                    </div>
                )
            }

        } else return <h1>Su cuenta ha sido suspendida</h1>

    } else return <h1>loading....</h1>



}

export default Home;