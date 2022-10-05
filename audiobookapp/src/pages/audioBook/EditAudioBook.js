import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioBookService from "../../service/AudioBookService";
import { app } from "../../multimedia";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const EditAudioBook = () => {

    const [titleAudioBook, setTitleAudioBook] = useState('');
    const [author, setAuthor] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [gender, setGender] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [urlAudio, setUrlAudio] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const { idAudioBook } = useParams();
    const history = useHistory();
    const { user } = useAuth();
    var [userId, setUserId] = useState('');

    //funcion para guardar un audiolibro
    const saveAudioBook = () => {
        const audioBook = { titleAudioBook, author, sipnosis, gender, urlImage, urlAudio, yearOfPublication, idAudioBook, userId };
        //update the records
        console.log("audiobook", audioBook);
        AudioBookService.updateAudioBook(audioBook)
            .then(response => {
                console.log('AudioBook data updated succesfully', response.data);
                history.push('/home');
            })
            .catch(error => [
                console.log('Something went wrong', error)
            ])
    };

    //Función para cargar la portada del audiolibro y guardarla en 
    //firebase y obtener su url para guardar en bdd
    const imageHandler = async (event) => {
        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const imagePath = storageRef.child(image.name);
        await imagePath.put(image);
        const url = await imagePath.getDownloadURL();
        setUrlImage(url);
    }

    //Función para cargar el archivo  mp3 y guardarlo en 
    //firebase y obtener su url para guardar en bdd
    const audioHandler = async (event) => {
        const audio = event.target.files[0];
        const storageRef = app.storage().ref();
        const audioPath = storageRef.child(audio.name);
        await audioPath.put(audio);
        console.log("Archivo cargado: ", audio.name);
        const url = await audioPath.getDownloadURL();
        setUrlAudio(url);
    }

    useEffect(() => {
        if (idAudioBook) {
            AudioBookService.searchByIdAudioBook(idAudioBook)
                .then(audioBook => {
                    setTitleAudioBook(audioBook.data.titleAudioBook);
                    setAuthor(audioBook.data.author);
                    setSipnosis(audioBook.data.sipnosis);
                    setGender(audioBook.data.gender);
                    setUrlImage(audioBook.data.urlImage);
                    setUrlAudio(audioBook.data.urlAudio);
                    setYearOfPublication(audioBook.data.yearOfPublication);
                })
                .catch(error => {
                    console.log('Something went wrong', error)
                });
        }

    }, [])

    useEffect(() => {
        userId = user.uid;
        setUserId(user.uid);
    }, [user]);

    return (
        <div>
            <div className="flex-parent-element col-12">

                <div className="flex-child-element magenta col-7">
                    <h3>Editar Audiolibro</h3>
                </div>

                <div className="col-2"></div>

                <div className="flex-child-element green col-4">
                    <button className="btn-save" onClick={saveAudioBook}>Guardar</button>
                </div>

            </div>

            <hr />
            <div className="scrollable-div">
                <form>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="titleAudioBook"
                            value={titleAudioBook}
                            disabled={true} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Autor</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="author"
                            value={author}
                            disabled={true} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Sipnosis</label>
                        <textarea
                            name="paragraph_text"
                            cols="50"
                            rows="10"
                            type="text"
                            className="form-control col-4"
                            id="sipnosis"
                            value={sipnosis}
                            onChange={(e) => setSipnosis(e.target.value)} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Género</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="gender"
                            value={gender}
                            disabled={true} />
                    </div>

                    <div style={{paddingTop: "10px"}}>
                        <label>Imagen</label>
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={urlImage}
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
                            id="urlImage"
                            value={urlImage}
                            onChange={(e) => setUrlImage(e.target.value)}
                            hidden={true} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Audio</label>
                        <div>
                            <input
                                type="file"
                                onChange={audioHandler} />

                        </div>


                        <input
                            type="text"
                            className="form-control col-4"
                            id="urlAudio"
                            value={urlAudio}
                            onChange={(e) => setUrlAudio(e.target.value)}
                            hidden={true} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Año de publicación</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="yearOfPublication"
                            value={yearOfPublication}
                            disabled={true} />
                    </div>

                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="userId"
                        value={userId}
                        hidden={true}
                        onChange={(e) => setUserId(e.target.value)} />

                </div>

                </form>

            </div>



        </div>

    );

}

export default EditAudioBook;
