import { useEffect, useState } from "react";
import AudioBookService from "../../service/AudioBookService";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactAudioPlayer from "react-audio-player";
import React from 'react';
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { Link } from "react-router-dom";

const AudioBooksList = () => {

  const [audioBooks, setAudioBooks] = useState([]);

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    AudioBookService.getAllAudioBooks()
      .then(response => {
        console.log('AudioBooks data', response.data);
        setAudioBooks(response.data);
      })
      .catch(error => {
        console.log('Algo salio mal', error)
      })
  }

  const handleDelete = idAudioBook => {
    AudioBookService.deleteAudioBook(idAudioBook)
      .then(response => {
        console.log('Audiobook deleted succesfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Algo salio mal', error)
      })
  }

  function getReview(reviews) {
    let totalreview = 0;
    reviews.map(review => {
      totalreview += parseInt(review.rating)
    })
    let result = totalreview / reviews.length
    console.log('result', result)
    if (Number.isNaN(result)) {
      console.log('aqui')
      return 'Not reviewed'
    } else {
      return result
    }

  }
  
  return (
    <div className="container ">
      <h3>Manejador de audiolibros</h3>
      <div>
        <Link to="/addAudioBook" className="btn btn-primary mb-2">Añadir AudioLibro</Link>
        <table className="table table-bordered table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Imagen</th>
              <th>Audio mp3</th>
              <th>Género</th>
              <th>Año de publicación</th>
              <th>Sipnosis</th>
              <th>Reseña</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {
            audioBooks.map(audioBook => (
              <tr key={audioBook.idAudioBook}>
                <td>{audioBook.titleAudioBook}</td>
                <td>{audioBook.author}</td>
                <td>
                  <img
                    src={audioBook.urlImage}
                    width="113" height="150" />
                </td>
                <td>
                  <ReactAudioPlayer src={audioBook.urlAudio} autoPlay controls />
                </td>
                <td>{audioBook.gender}</td>
                <td>{audioBook.yearOfPublication}</td>
                <td>{audioBook.sipnosis}</td>
                <td>{getReview(audioBook.reviews)}</td>

                <td>
                  {/* <Button label="Editar" to={`/updateAudioBook/${audioBook.idAudioBook}`} className="p-button-raised p-button-rounded" /> */}
                  <Link className="btn btn-info" to={`/updateAudioBook/${audioBook.idAudioBook}`}>Editar</Link>
                  <Button label="Eliminar" className="p-button-raised p-button-rounded" onClick={(a) => {
                    handleDelete(audioBook.idAudioBook)
                  }} />
                </td>
              </tr>

            ))
          }

        </table>
      </div>
    </div>
  );
}

export default AudioBooksList;