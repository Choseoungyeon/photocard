import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom"


import Photo from "./components/views/Photo/Photo";
import Nav from "./components/views/NavBar/NavBar";

function App() {
 return<Router>
   <Nav />
   <Routes>
     <Route path="/" element={<Photo />}></Route>
   </Routes>
 </Router>
}

export default App;