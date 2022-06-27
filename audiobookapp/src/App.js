import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AudioBooksList from "../src/pages/audioBook/AudioBookList";
import AddAudioBook from "../src/pages/audioBook/AddAudioBook";
import EditAudioBook from "../src/pages/audioBook/EditAudioBook";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/authentication/Home";
import Login from "../src/pages/authentication/Login";
import Register from "../src/pages/authentication/Register";
import AuthProvider from "../src/context/authContext"


function App() {
  return (
    <AuthProvider>
      <Router>
      <div>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/menu" component={Navbar}></Route>
          <Route path="/audioBookManager" component={AudioBooksList}></Route>
          <Route path="/addAudioBook" component={AddAudioBook}></Route>
          <Route path="/updateAudioBook/:idAudioBook/" component={EditAudioBook}></Route>
          <Route path="/searchByIdAudioBook/:idAudioBook" component={AddAudioBook}></Route>
        </Switch>
      </div>
    </Router>
    </AuthProvider>
    
  )
}

export default App;