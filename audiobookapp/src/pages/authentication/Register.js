import React, { useState } from "react";
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"


function Register() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        userName: "",
    });

    const { signUp } = useAuth();
    const navigate = useHistory();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value })
        console.log(user)

    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        try {
            await signUp(user.email, user.password, user.userName);
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
                    <button>Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default Register;