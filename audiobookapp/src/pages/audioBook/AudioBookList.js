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
import { useAuth } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import db, { auth } from "../../multimedia";
import { onAuthStateChanged } from "firebase/auth";
import Table from 'react-bootstrap/Table';

const AudioBooksList = () => {

  const [audioBooks, setAudioBooks] = useState([]);
  const { user, logout } = useAuth();
  const [userId] = useState([]);

  const [userCurrent, setUserCurrent] = useState({
    email: "",
    photo: "",
    rol: "",
    userName: "",
    access: "",
  }
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.uid) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        init();
        getDataUser();
        // ...
      } else {
        // User is signed out
        // ...
      }
    });


  }, [])



  const init = () => {
    //función para obtener toda la lista de audiolibros
    const books = [];

    AudioBookService.getAllAudioBooks()
      .then(response => {
        response.data.map(book => {
          if (user.uid === book.userId) {
            books.push(book);
          }
        })
        setAudioBooks(books);
      })
      .catch(error => {
        console.log('Algo salio mal', error)
      })
  }

  //función para eliminar un audiolibro
  const handleDelete = idAudioBook => {
    AudioBookService.deleteAudioBook(idAudioBook)
      .then(response => {
        console.log('Audiobook deleted succesfully', response.data);
        alert("El audiolibro fue eliminado exitosamente")
        init();
      })
      .catch(error => {
        console.log('Algo salio mal', error)
      })
  }

  //función para obtener un promedio de todas las reviews
  //de un audiolibro
  function getReview(reviews) {
    let totalreview = 0;
    reviews.map(review => {
      totalreview += parseInt(review.rating)
    })
    let result = totalreview / reviews.length
    if (Number.isNaN(result)) {
      return 'Not reviewed'
    } else {
      return result
    }

  }

  const getDataUser = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserCurrent(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  return (
    <div className="container ">
      <h3>Mi Biblioteca</h3>

      <div>
        <div>
          <Link to="/addAudioBook" className="btn btn-primary mb-2" style={{
            fontWeight: "bold", color: "white",
            backgroundColor: "#0B6E4F", borderColor: "#0B6E4F"
          }}>Añadir AudioLibro</Link>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Imagen</th>
              <th>Audio mp3</th>
              <th>Género</th>
              <th>Año</th>
              <th>Sipnosis</th>
              <th>Reseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
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
                    <ReactAudioPlayer src={audioBook.urlAudio} controls />
                  </td>
                  <td>{audioBook.gender}</td>
                  <td>{audioBook.yearOfPublication}</td>
                  <td style={{ textAlign: "justify" }}>{audioBook.sipnosis}</td>
                  <td>{getReview(audioBook.reviews)}</td>

                  <td>
                    <div style={{ paddingTop: "35px" }}>
                      <div style={{ textAlign: "center" }}>
                        <Link className="btn btn-info" to={`/updateAudioBook/${audioBook.idAudioBook}`} style={{
                          fontWeight: "bold", color: "white",
                          backgroundColor: "#6BBF59", borderColor: "#6BBF59", width: "100%"
                        }}>Editar</Link>
                      </div>

                      <div style={{ textAlign: "center", paddingTop: "10px" }}>
                        <Button label="Eliminar" style={{
                          height: "40px", color: "white",
                          backgroundColor: "#cc444b", borderColor: "#cc444b"
                        }}
                          onClick={(a) => {
                            handleDelete(audioBook.idAudioBook)
                          }} />
                      </div>

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

export default AudioBooksList;