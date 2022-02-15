import React from 'react';
import {Link}from "react-router-dom"
import "./NavBarModule.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Nav() {
  return <div className="nav_container">
    <div className="centerbox">
      <h1>
        <Link to={"/"} >PHOTO CARD</Link>
      </h1>
      <div className='Nav_right'>
        <ul>
          <li>MAKE CARD</li>
          <li>LOGIN</li>
          <li>SIGNUP</li>
          <li><FontAwesomeIcon style={{ width: 40, height: 40 }} icon={faUserCircle} /></li>
        </ul>
      </div>
    </div>
  </div>;
}

export default Nav;
