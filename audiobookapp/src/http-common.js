import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8080/api/audioBook',
    headers: {
        'Content-Type': 'application/json'
    }

})