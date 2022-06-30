import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../multimedia"
function UserManager() {

    const q = query(collection(db, "users"));

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const postData = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(
            (doc) =>{
                postData.push({ ...doc.data(), id: doc.id });
                console.log("element",doc.id, " => ", doc.data());
            }
                
                
        );
        setUsers(postData);
    }

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div className="container ">
            <h3>Administrador de usuarios</h3>
            <div>
                <table className="table table-bordered table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                  
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