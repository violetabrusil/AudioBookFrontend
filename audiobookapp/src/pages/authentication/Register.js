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

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value })
    console.log(user)

    const imageHandler = async (event) => {
        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const imagePath = storageRef.child(image.name);
        await imagePath.put(image);
        console.log("Imagen cargada: ", image.name);
        const url = await imagePath.getDownloadURL();
        setUrlImage(url);
    }

    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        try {
            await signUp(user.email, user.password, user.userName, urlImage);
            navigate.push('/home')
        } catch (error) {
            setError(error.message);
        }
    };



    return (
        <div className="container">
            {error && <p>{error}</p>}
            <h2>Regístrate gratis para empezar</h2>
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
                <div className="form-group">
                    <label>Nombre de usuario</label>
                    <input
                        type="text"
                        name="userName"
                        className="form-control col-4"
                        placeholder="Ingrese un nombre de perfil"
                        onChange={handleChange}></input>
                </div>
                <div>
                    <label>Foto de perfil</label>
                    <form>
                        <input
                            type="file"
                            onChange={imageHandler} />
                    </form>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="urlImage"
                        value={urlImage}
                        onChange={(e) => setUrlImage(e.target.value)} 
                        hidden={true}/>

                </div>

                <div>
                    <button>Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default Register;