import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AudioBookService from "../../service/AudioBookService";

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

            console.log(audioBook);
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
    })

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

                <div>
                    <label>Imagen</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="urlImage"
                        value={urlImage}
                        onChange={(e) => setUrlImage(e.target.value)} /> 

                </div>

                <div className="form-group">
                    <label>Audio</label>
                    <input
                        type="text"
                        className="form-control col-4"
                        id="urlAudio"
                        value={urlAudio}
                        onChange={(e) => setUrlAudio(e.target.value)} />

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