import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom"
import Photo from "./components/views/Photo/Photo";
import Nav from "./components/views/NavBar/NavBar";
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import LandingPage from "./components/views/LandingPage/LandingPage";
import Album from "./components/views/Album/Album";
import Community from "./components/views/Community/Community";
import UploadPage from "./components/views/UploadPage/UploadPage";
import ModifyPage from "./components/views/ModifyPage/ModifyPage";
import CommunityDetail from "./components/views/CommunityDetail/CommunityDetail";
import Auth from './hoc/auth'

function App() {
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false)
  const NewPhoto = Auth(Photo, null)
  const NewLandingPage = Auth(LandingPage, null)
  const NewAlbum = Auth(Album, null)
  const NewCommunity = Auth(Community, null)
  const NewUploadPage = Auth(UploadPage, true)
  const NewCommunityDetail = Auth(CommunityDetail, true)
  const NewModifyPage = Auth(ModifyPage, true)

 return<Router>
   <Nav />
   <Routes>
     <Route path="/" element={<NewLandingPage />}></Route>
     <Route path="/photoCard" element={<NewPhoto />}></Route>
     <Route path="/login" element={<NewLoginPage />}></Route>
     <Route path="/register" element={<NewRegisterPage />}></Route>
     <Route path="/user/album" element={<NewAlbum />}></Route>
     <Route path="/community" element={<NewCommunity />}></Route>
     <Route path="/community/:communityId" element={<NewCommunityDetail />}></Route>
     <Route path="/community/upload" element={<NewUploadPage />}></Route>
     <Route path="/community/modifyPage/:communityId" element={<NewModifyPage />}></Route>
   </Routes>
 </Router>
}

export default App;