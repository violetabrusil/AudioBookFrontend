import React, { useState } from "react";
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { app } from "../../multimedia"
import { Link } from "react-router-dom";

function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const firestore = getFirestore(app);

    const { login, loginWithGoogle } = useAuth();
    const navigate = useHistory();
    const [error, setError] = useState();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormVaLues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    //Obtener valores del usuario del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setFormVaLues({ ...formValues, [name]: value });
    }

    //llamada a al función para que el usuario inicie sesión
    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        setFormErrors(validate(formValues));
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
        const uid = login.user.uid;
        const docuRef = doc(firestore, `users/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data();
        if (!infoFinal) {
            setDoc(docuRef, { userName: login.user.displayName, rol: "author", photo: login.user.photoURL, email: login.user.email, access: "true" });
        }
        navigate.push('/home')

    }

    //función para validar que el email y password sean válidos
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "El email es requerido"
        } else if (!regex.test(values.email)) {
            errors.email = "El email no tiene un formato valido"
        }
        if (!values.password) {
            errors.password = "La contraseña es requerida"
        } else if (values.password !== user.password) {
            errors.password = "La contraseña es incorrecta"
        }
        return errors;
    };

    //Diseño de login
    return (
        <div className="container">

            {error && <div className="error-back">{error}</div>}
            <br></br>
            <form onSubmit={handleSubmit}>

                <h2 style={{ textAlign: "center" }}>Iniciar sesión</h2>
                <hr />
                <div className="ui divider"></div>
                <div className="body">
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control col-4"
                            placeholder="Ingrese su email"
                            value={formValues.email}
                            onChange={handleChange}

                        ></input>
                    </div>
                    <p className="error-msg">{formErrors.email}</p>
                    <div className="field">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control col-4"
                            placeholder="Crea una contraseña"
                            value={formValues.password}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <p className="error-msg ">{formErrors.password}</p>

                    <div className="div-style">
                        <button className="btn-login">Ingresar</button>
                    </div>

                    <div className="div-style">
                        <button className="g-btn" onClick={handleGoogleSignin}>Ingresa con Google</button>
                    </div>
                    <div className="div-style">
                        <Link to={'/register'}>¿Es nuevo aquí? Cree una cuenta</Link>
                    </div>


                </div>


            </form>
        </div>
    )
}

export default Login;