import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import db from "../../multimedia";
import { Button } from 'primereact/button';
import { app } from "../../multimedia";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/authContext"

function UserManager() {

    const q = query(collection(db, "users"));
    const [users, setUsers] = useState([]);
    const firestore = getFirestore(app);
    const { user } = useAuth();


    //Función para obtener todos los usuarios registrados
    //mediante su documento 
    const getUsers = async () => {
        const postData = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(
            (doc) => {
                if (doc.data().rol !== "admin") {
                    postData.push({ ...doc.data(), id: doc.id });
                }

            }
        );
        setUsers(postData);
    }

    useEffect(() => {
        getUsers();
    }, [firestore, user]);

    async function enableDisableAccount(userId, status) {
        const docuRef = doc(firestore, `users/${userId}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data();
        if (infoFinal) {
            infoFinal.access = status;
            setDoc(docuRef, infoFinal);
            getUsers();
        }

    }

    //Pantalla para administrador 

    return (
        <div className="container ">
            <h3>Usuarios Registrados</h3>
            <div>
                <table className="table table-bordered table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol}</td>
                                    <td>
                                        {user.access === "false" ? <Button label="Habilitar" className="p-button-raised p-button-rounded" onClick={
                                            () => enableDisableAccount(user.id, "true")
                                        } /> : <Button label="Deshabilitar" className="p-button-raised p-button-rounded" onClick={
                                            () => enableDisableAccount(user.id, "false")
                                        } />}


                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default UserManager;