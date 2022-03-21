import React from 'react';
import {Link}from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import logo_photocard from "../../../img/Nav/logo_photocard.svg"
import axios from 'axios';
import "./NavBarModule.css"

function Nav() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)

  const onClickHandler = ()=>{
    axios.get('/api/users/logout')
    .then(response => {
        if(response.data.success){
            navigate('/login')
        }else{
            alert('로그아웃 하는데 실패 했습니다')
        }
    })
}

  return <div className="nav_container">
    <div className="centerbox">
      <h1>
        <Link to={"/"} >
          <img src={logo_photocard} alt="logo" />
        </Link>
      </h1>
      <div className='Nav_right'>
      {user.userData && !user.userData.isAuth ?
          <ul>
            <li><Link to={"/community"} >COMMUNITY</Link></li>
            <li><Link to={"/login"} >LOGIN</Link></li>
            <li><Link to={"/register"} >SIGNUP</Link></li>
            <li><FontAwesomeIcon style={{ width: 29, height: 29 }} icon={faUserCircle} /></li>
          </ul>
          :
          <ul>
            <li><Link to={"/community"} >COMMUNITY</Link></li>
            <li><Link to={"/photoCard"} >MAKE CARD</Link></li>
            <li onClick={onClickHandler} style={{cursor:"pointer"}}>LOGOUT</li>
            <li><Link to={"/user/album"}><FontAwesomeIcon style={{ width: 29, height: 29 }} icon={faUserCircle} /></Link></li>
          </ul>
      }
      </div>
    </div>
  </div>;
}

export default Nav;
