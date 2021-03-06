import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AudioBookService from "../../service/AudioBookService";
import { app } from "../../multimedia"

const AddAudioBook = () => {

    const [titleAudioBook, setTitleAudioBook] = useState('');
    const [author, setAuthor] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [gender, setGender] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [urlAudio, setUrlAudio] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const history = useHistory();
    const { idAudioBook } = useParams();

    //Función para guardar los audiolibros
    const saveAudioBook = (a) => {
        a.preventDefault();

        const audioBook = { titleAudioBook, author, sipnosis, gender, urlImage, urlAudio, yearOfPublication, idAudioBook };
        if (idAudioBook) {
            //update the records
            AudioBookService.updateAudioBook(audioBook)
                .then(response => {
                    console.log('AudioBook data updated succesfully', response.data);
                    history.push('/audioBookManager');
                })
                .catch(error => [
                    console.log('Something went wrong', error)
                ])

        } else {
            const audioBook = { titleAudioBook, author, sipnosis, gender, urlImage, urlAudio, yearOfPublication };
            //create a new record
            AudioBookService.addAudioBook(audioBook)
                .then(response => {
                    console.log('response', response)
                    console.log('AudioBook added succesfully', response.data);
                    history.push('/audioBookManager');
                })
                .catch(error => {
                    console.log('Something went wrong', error)
                });
        }

    }

    useEffect(() => {
        //Verifica que el audiolibro ya exista para mostrar la informacion al momento de editar
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
    });

    //Función para cargar la portada del audiolibro y guardarla en 
    //firebase y obtener su url para guardar en bdd
    const imageHandler = async (event) => {
        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const imagePath = storageRef.child(image.name);
        await imagePath.put(image);
        console.log("Imagen cargada: ", image.name);
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

    //Diseño de la pantalla para agregar un audiolibro
    return (
        <div className="container">
            <h3>Añadir AudioLibro</h3>
            <hr />
            <form>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="titleAudioBook"
                        value={titleAudioBook}
                        onChange={(e) => setTitleAudioBook(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Autor</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Sipnosis</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="sipnosis"
                        value={sipnosis}
                        onChange={(e) => setSipnosis(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} />

                </div>

                <div className="form-group">
                    <label>Imagen</label>
                    <div>
                        <img
                            src={urlImage}
                            width="113" height="150"
                        />
                    </div>
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
                        hidden={true} />

                </div>

                <div className="form-group">
                    <label>Audio</label>
                    <form>
                        <input
                            type="file"
                            onChange={audioHandler} />
                    </form>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="urlAudio"
                        value={urlAudio}
                        onChange={(e) => setUrlAudio(e.target.value)}
                        hidden={true} />

                </div>

                <div className="form-group">
                    <label>Año de publicación</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="yearOfPublication"
                        value={yearOfPublication}
                        onChange={(e) => setYearOfPublication(e.target.value)} />

                </div>

                <div>
                    <button className="btn btn-primary" onClick={(a) => saveAudioBook(a)}>Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default AddAudioBook;