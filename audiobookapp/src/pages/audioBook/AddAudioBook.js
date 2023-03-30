import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AudioBookService from "../../service/AudioBookService";
import { app } from "../../multimedia";
import { useAuth } from "../../context/authContext";
import Select from "react-select"

const AddAudioBook = () => {

    const [titleAudioBook, setTitleAudioBook] = useState('');
    const [author, setAuthor] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [gender, setGender] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [urlAudio, setUrlAudio] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    var [userId, setUserId] = useState('');
    const history = useHistory();
    const { user } = useAuth();

    //Función para guardar los audiolibros
    const saveAudioBook = (a) => {
        a.preventDefault();
        const audioBook = { titleAudioBook, author, sipnosis, gender, urlImage, urlAudio, yearOfPublication, userId };
        //create a new record
        AudioBookService.addAudioBook(audioBook)
            .then(response => {
                console.log('AudioBook added succesfully', response.data);
                history.push('/home');
            })
            .catch(error => {
                console.log('Something went wrong', error)
            });
    }

    useEffect(() => {
        userId = user.uid;
        setUserId(user.uid);
    }, [user]);

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
        const url = await audioPath.getDownloadURL();
        setUrlAudio(url);
    }

    const genres = [
        { value: "Novela", label: "Novela" },
        { value: "Comedia", label: "Comedia" },
        { value: "Ciencia Ficción", label: "Ciencia Ficción" },
        { value: "Educativo", label: "Educativo" },
        { value: "Literario", label: "Literario" },
    ]

    const handleSelectChange = ({ value }) => {
        setGender(value);
    }

    //Diseño de la pantalla para agregar un audiolibro
    return (
        <div className="container">
            <div className="flex-parent-element col-12">

                <div className="flex-child-element magenta col-7">
                    <h3>Añadir Audiolibro</h3>
                </div>

                <div className="col-2"></div>

                <div className="flex-child-element green col-4">
                    <button className="btn-save" onClick={(a) => saveAudioBook(a)}>Guardar</button>
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
                            maxLength="50"
                            value={titleAudioBook}
                            onChange={(e) => setTitleAudioBook(e.target.value)} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Autor</label>
                        <input
                            type="text"
                            className="form-control col-4"
                            id="author"
                            maxLength="20"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} />
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
                            onChange={(e) => setSipnosis(e.target.value)}
                            style={{textAlign: "justify"}} />
                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Género</label>
                        <Select
                            defaultValue={{ label: 'Seleccione el género', value: '' }}
                            options={genres}
                            onChange={handleSelectChange}
                        ></Select>


                    </div>

                    <div className="form-group" style={{paddingTop: "10px"}}>
                        <label>Imagen</label>
                        <div style={{textAlign: "center"}}>
                            <img
                                src={urlImage}
                                width="113" height="150"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                onChange={imageHandler} />
                        </div>
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
                            onChange={(e) => setYearOfPublication(e.target.value)} />

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

                    <div>

                    </div>
                </form>

            </div>

        </div>
    );
}

export default AddAudioBook;