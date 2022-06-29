import React, { useState } from "react";
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"


function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { login, loginWithGoogle } = useAuth();
    const navigate = useHistory();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value })

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

    const handleGoogleSignin = async() => {
        await loginWithGoogle();
        navigate.push('/home')

    }

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