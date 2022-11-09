import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import db from "../../multimedia";
import { Button } from 'primereact/button';
import { app } from "../../multimedia";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/authContext"
import Table from 'react-bootstrap/Table';

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
                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr style={{textAlign: "center"}}>
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
                                    <td >
                                        <div style={{ textAlign: "center" }}>

                                            {user.access === "false" ? <Button label="Habilitar"
                                                style={{
                                                    height: "40px", color: "white", backgroundColor: "#10b981", borderColor: "#10b981",
                                                    width: "135px"
                                                }}
                                                onClick={
                                                    () => enableDisableAccount(user.id, "true")
                                                } /> : <Button label="Deshabilitar" style={{
                                                    height: "40px", color: "white", backgroundColor: "#E7204E", borderColor: "#E7204E"
                                                }}
                                                    onClick={
                                                        () => enableDisableAccount(user.id, "false")
                                                    } />}

                                        </div>



                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );

}

export default UserManager;