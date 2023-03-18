import React, { useContext, useEffect } from "react";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import {PostContext} from "./store/PostContext";
import Create from "./Components/Create/Create";
import Post from './store/PostContext'

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
 
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user);
    })
  },[])

  return (
    <div>
    <Post >
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/viewpost">
          <ViewPost />
        </Route>
      </Router>
     </Post>
    </div>
  );
}

export default App;
