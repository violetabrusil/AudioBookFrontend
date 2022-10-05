import httpClient from '../http-common';

const router = "http://localhost:8080"

const getAllAudioBooks = () => {
    return httpClient.get(`${router}/api/audioBook/getAllAudioBooks`);
}

const addAudioBook = (data) => {
    
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