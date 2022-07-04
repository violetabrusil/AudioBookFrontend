import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioBookService from "../../service/AudioBookService";
import { app } from "../../multimedia"
const EditAudioBook = () => {

    const [titleAudioBook, setTitleAudioBook] = useState('');
    const [author, setAuthor] = useState('');
    const [sipnosis, setSipnosis] = useState('');
    const [gender, setGender] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [urlAudio, setUrlAudio] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const { idAudioBook } = useParams();

    //funcion para guardar un audiolibro
    const saveAudioBook = () => {
        console.log('prueba')
        const audioBook = { titleAudioBook, author, sipnosis, gender, urlImage, urlAudio, yearOfPublication, idAudioBook };
        //update the records
        console.log("audiobook", audioBook);
        AudioBookService.updateAudioBook(audioBook)
            .then(response => {
                console.log('AudioBook data updated succesfully', response.data);
                //history.push('/audioBookManager');
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

 

    return (
        <div className="container">
            <h3>Editar AudioLibro</h3>
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

                <div >
                    <label>Imagen</label>
                    <div>
                            <img
                               
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

                <div className="form-group">
                    <label>Audio</label>
                 
                        <input
                            type="file"
                            onChange={audioHandler} />
                    
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
                    <button className="btn btn-primary" onClick={saveAudioBook}>Guardar</button>
                </div>
            </form>
        </div>
    );

}

export default EditAudioBook;
