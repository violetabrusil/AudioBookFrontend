import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AudioBooksList from "../src/pages/audioBook/AudioBookList"
import AddAudioBook from "../src/pages/audioBook/AddAudioBook";
import EditAudioBook from "../src/pages/audioBook/EditAudioBook";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/audioBookManager" component={AudioBooksList}></Route>
          <Route path="/addAudioBook" component={AddAudioBook}></Route>
          <Route path="/updateAudioBook/:idAudioBook/" component={EditAudioBook}></Route>
          <Route path="/searchByIdAudioBook/:idAudioBook" component={AddAudioBook}></Route>
        </Routes>

      </div>
    </Router>
  )
}

export default App;