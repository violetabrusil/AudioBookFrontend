import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import db, { app } from "../../multimedia"

function Home() {

    const { user, logout} = useAuth();
    const navigate = useHistory();
    const [loading, setLoading] = useState(true);
    const [userCurrent, setUserCurrent] = useState({
        email: "",
        photo: "",
        rol: "",
        userName : ""
    }
    );



    const handleLogout = async () => {
        await logout();
        navigate.push('/login');
    }

    const getDataUser = async () => {

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

    useEffect(() => {
        getDataUser();
        setLoading(false);
    }, []);

    return (
        <div>
            <h1>Bienvenido {userCurrent.userName}</h1>
            <button onClick={handleLogout}>Salir</button>
        </div>
    )
}

export default Home;