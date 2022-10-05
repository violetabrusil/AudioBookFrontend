import React, { useState } from "react";
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"
import { app } from "../../multimedia"

function Register() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        userName: "",
    });
    const [urlImage, setUrlImage] = useState('');
    const { signUp } = useAuth();
    const navigate = useHistory();
    const [error, setError] = useState();
    const initialValues = { email: "", password: "", userName: "" };
    const [formValues, setFormVaLues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    //Obtiene los valores del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setFormVaLues({ ...formValues, [name]: value });
    }

    //Carga la imagen de foto de perfil de usuario
    // a firebase y obtiene la dirección
    //url para guardar en la base de datos de posgressql
    const imageHandler = async (event) => {
        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const imagePath = storageRef.child(image.name);
        await imagePath.put(image);
        const url = await imagePath.getDownloadURL();
        setUrlImage(url);
    }

    //Llamada a la funcion de registro de usuarios
    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        setFormErrors(validate(formValues));
 
        try {
            await signUp(user.email, user.password, user.userName, urlImage);
            navigate.push('/home')
        } catch (error) {
            setError(error.message);
        }
    };

    //función para validar que el email, password, nombre de usuario sean válidos 
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
        } else if (values.password.length < 8) {
            errors.password = "La contraseña debe tener más de 8 caracteres"
        }
        if (!values.userName) {
            errors.userName = "El nombre de usuario es requerido"
        } else if (values.userName.length < 10) {
            errors.userName = "El nombre de usuario debe tener al menos 10 caracteres"
        }
        return errors;
    };


    //Diseño de la página para registro
    return (
        <div className="container">
            {error && <div className="error-back">{error}</div>}
            <br></br>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Regístrate gratis para empezar</h2>
                <hr />
                <div className="ui divider"></div>
                <div className="body">
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form"
                            placeholder="Ingrese su email"
                            value={formValues.email}
                            onChange={handleChange}></input>
                    </div>
                    <p className="error-msg">{formErrors.email}</p>
                    <div className="field">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form"
                            placeholder="Crea una contraseña"
                            value={formValues.password}
                            onChange={handleChange}></input>
                    </div>
                    <p className="error-msg">{formErrors.password}</p>
                    <div className="field">
                        <label>Nombre de usuario</label>
                        <input
                            type="text"
                            name="userName"
                            className="form"
                            placeholder="Cree un nombre de usuario"
                            value={formValues.userName}
                            onChange={handleChange}></input>
                    </div>
                    <p className="error-msg">{formErrors.userName}</p>

                    <div className="field">
                        <label>Foto de perfil</label>
                        <div>
                            <input
                                type="file"
                                onChange={imageHandler} />
                        </div>


                    </div>

                    <div>
                        <input
                            type="text"
                            className="form"
                            id="urlImage"
                            value={urlImage}
                            onChange={(e) => setUrlImage(e.target.value)}
                            hidden={true} />

                    </div>

                    <div className="div-style-tw">
                        <button className="btn-register">Registrar</button>
                    </div>

                </div>

            </form>
        </div>
    )
}

export default Register;