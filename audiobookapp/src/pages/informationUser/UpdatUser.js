import { useEffect, useState } from "react";
import { query, collection, where, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import db from "../../multimedia";
import { Button } from 'primereact/button';
import { useAuth } from "../../context/authContext";
import { app } from "../../multimedia";

function UpdateUser() {

    const [userName, setUserName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const { user } = useAuth();
    const [userCurrent, setUserCurrent] = useState({
        email: "",
        photo: "",
        rol: "",
        userName: "",
        access: "",
    }
    );

    const getDataUser = async () => {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('user', docSnap.data())
            setUserCurrent(docSnap.data());
        } else {
            console.log("No such document!");
        }

    };

    useEffect(() => {
        getDataUser();
    }, [user]);

    useEffect(() => {
        setProfilePhoto(userCurrent.photo);
        setUserName(userCurrent.userName);
    }, [userCurrent.photo, userCurrent.userName] );


    const imageHandler = async (event) => {
        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const imagePath = storageRef.child(image.name);
        await imagePath.put(image);
        console.log("Imagen cargada: ", image.name);
        const url = await imagePath.getDownloadURL();
        setProfilePhoto(url);
    };

    const updateData = async () => {
        const userRef = query(collection(db, "users"), where("email", "==", userCurrent.email));
        const findUsers = await getDocs(userRef);
        findUsers.forEach(async (user) => {
            const getUser = doc(db, 'users', user.id);
            await updateDoc(getUser, {
                userName: userName,
                photo: profilePhoto
            });
            console.log('update user')
        });
    };


    const changeUserName = (event) => {
        event.preventDefault();
        setUserName(event.target.value)
    };
    const changePhoto = (event) => {
        event.preventDefault();
        setProfilePhoto(event.target.value)
    };



    if (userCurrent.userName && userCurrent.photo) {
        return (
            <div className="container">
                <h1>Editar Información</h1>
                <form>

                    <div className="form-group">
                        <label>Foto de perfil</label>
                        <div>
                            <img
                                src={profilePhoto}
                                width="113" height="150"
                            />
                        </div>
                        <input
                            type="file"
                            onChange={imageHandler}
                        />
                        <input
                            type="text"
                            className="form-control col-4"
                            id="profilePhoto"
                            value={profilePhoto}
                            hidden={true}
                            onChange={changePhoto}
                        />

                    </div>

                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="userName"
                            value={userName}
                            onChange={changeUserName}
                        />
                    </div>




                </form>

                <Button label="Guardar" className="p-button-raised p-button-rounded"
                    onClick={() => updateData()} />

            </div>
        )

    } else return <h1>Loading....</h1>

}

export default UpdateUser;