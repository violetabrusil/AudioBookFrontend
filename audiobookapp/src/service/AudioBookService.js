import httpClient from '../http-common';

const router = "http://localhost:8080"

const getAllAudioBooks = () => {
    return httpClient.get(`${router}/api/audioBook/getAllAudioBooks`);
}

const addAudioBook = (data) => {
    
    return httpClient.post(`${router}/api/audioBook/addAudioBook`,data)
}

const updateAudioBook = (data) => {
    return httpClient.put(`${router}/api/audioBook/updateAudioBook/`,data)

}

const searchByIdAudioBook = idAudioBook => {
    return httpClient.get(`${router}/api/audioBook/searchById/${idAudioBook}`);
}

const deleteAudioBook = idAudioBook => {
    return httpClient.delete(`${router}/api/audioBook/deleteAudioBook/${idAudioBook}`); 
}

export default {getAllAudioBooks, addAudioBook, updateAudioBook, searchByIdAudioBook, deleteAudioBook}