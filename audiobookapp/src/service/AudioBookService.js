import httpClient from '../http-common';

const getAllAudioBooks = () => {
    return httpClient.get('http://localhost:8080/api/audioBook/getAllAudioBooks');
}

const addAudioBook = (data) => {
    console.log('data', data)
    return httpClient.post('http://localhost:8080/api/audioBook/addAudioBook',data)
}

const updateAudioBook = (data) => {
    return httpClient.put('http://localhost:8080/api/audioBook/updateAudioBook/',data)

}

const searchByIdAudioBook = idAudioBook => {
    return httpClient.get(`http://localhost:8080/api/audioBook/searchById/${idAudioBook}`);
}

const deleteAudioBook = idAudioBook => {
    return httpClient.delete(`http://localhost:8080/api/audioBook/deleteAudioBook/${idAudioBook}`); 
}

export default {getAllAudioBooks, addAudioBook, updateAudioBook, searchByIdAudioBook, deleteAudioBook}