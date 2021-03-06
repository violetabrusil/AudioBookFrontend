import React, { useState } from "react";
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { app } from "../../multimedia"


function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const firestore = getFirestore(app);

    const { login, loginWithGoogle } = useAuth();
    const navigate = useHistory();
    const [error, setError] = useState();

    //Obtener valores del usuario del formulario
    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value })

    //llamada a al función para que el usuario inicie sesión
    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        try {
            await login(user.email, user.password);
            navigate.push('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    //llamada a la funcion para que el usuario inicie sesión con su cuenta de google
    const handleGoogleSignin = async () => {
        const login = await loginWithGoogle();
        console.log("sign up google", login);
        console.log(login.user.uid)
        const uid = login.user.uid;
        const docuRef = doc(firestore, `users/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data();
        if(!infoFinal){
            setDoc(docuRef, { userName: login.user.displayName, rol: "author", photo: login.user.photoURL, email: login.user.email, access: "true" });
        }
        navigate.push('/home')

    }

    //Diseño de login
    return (
        <div className="container">
            {error && <p>{error}</p>}
            <h2>Ingresa</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control col-4"
                        placeholder="Ingrese su email"
                        onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control col-4"
                        placeholder="Crea una contraseña"
                        onChange={handleChange}></input>
                </div>

                <div>
                    <button>Ingresar</button>
                </div>

                <div>
                    <button onClick={handleGoogleSignin}>Ingresa con Google</button>
                </div>
            </form>
        </div>
    )
}

export default Login;