import React,{useRef,useEffect,useState} from 'react';
import {Link}from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import logo_photocard from "../../../img/Nav/logo_photocard.svg"
import axios from 'axios';
import "./NavBarModule.css"

function Nav() {
  const navigate = useNavigate();
  const modal01 = useRef();
  const modal02 = useRef();
  const modal03 = useRef();
  const user = useSelector(state => state.user)

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate('/login')
        } else {
          alert('로그아웃 하는데 실패 했습니다')
        }
      })
  }

  useEffect(()=>{
    window.addEventListener("resize", testFun)

    return () => {
      window.removeEventListener("resize", testFun)
    }
  },[])

  const testFun = ()=>{
    if(window.innerWidth > 768){
      deletehandler()
    }
  }

  const deletehandler = () => {

    modal01.current.classList.remove("on")
      modal02.current.classList.remove("on")
      modal03.current.classList.remove("on")
  }

  const modalhandler = () => {

    if (modal01.current.classList.contains("on")) {
      modal01.current.classList.remove("on")
      modal02.current.classList.remove("on")
      modal03.current.classList.remove("on")
    } else {
      modal01.current.classList.add("on")
      modal02.current.classList.add("on")
      modal03.current.classList.add("on")
    }
  }

  return <div className="nav_container">
    <div className="centerbox">
      <h1>
        <Link to={"/"} onClick={deletehandler}>
          <img src={logo_photocard} alt="logo" />
        </Link>
      </h1>
      <div className='Nav_right' >
        {user.userData && !user.userData.isAuth ?
          <div>
            <ul  className='Nav_stone'>
              <li><Link to={"/community"} onClick={deletehandler} >COMMUNITY</Link></li>
              <li><Link to={"/login"} onClick={deletehandler}>LOGIN</Link></li>
              <li><Link to={"/register"} onClick={deletehandler}>SIGNUP</Link></li>
              <li>
                <FaUserCircle className='userIcon' onClick={deletehandler} />
                <p className='mobile'>{user.userData.name}</p>
              </li>
            </ul>
            <div className='Nav_mobile_stone' ref={modal03}>
              <ul>
                <li><Link to={"/community"} onClick={deletehandler} >COMMUNITY</Link></li>
                <li><Link to={"/login"} onClick={deletehandler}>LOGIN</Link></li>
                <li><Link to={"/register"} onClick={deletehandler}>SIGNUP</Link></li>
                <li>
                  <FaUserCircle className='userIcon' onClick={deletehandler} />
                  <p className='mobile'>{user.userData.name}</p>
                </li>
              </ul>
            </div>
          </div>

          :
          <div>
            <ul  className='Nav_stone'>
              <li><Link to={"/community"} onClick={deletehandler}>COMMUNITY</Link></li>
              <li><Link to={"/photoCard"} onClick={deletehandler}>MAKE CARD</Link></li>
              <li onClick={onClickHandler} style={{ cursor: "pointer" }} >LOGOUT</li>
              <li>
                <Link to={"/user/album"}><FaUserCircle className='userIcon' onClick={deletehandler} />
                  {user.userData ? <p className='mobile'>{user.userData.name}</p> : null}
                </Link>
              </li>
            </ul>
            <div className='Nav_mobile_stone' ref={modal03}>
              <ul>
                <li><Link to={"/community"} onClick={deletehandler}>COMMUNITY</Link></li>
                <li><Link to={"/photoCard"} onClick={deletehandler}>MAKE CARD</Link></li>
                <li onClick={onClickHandler} style={{ cursor: "pointer" }} >LOGOUT</li>
                <li>
                  <Link to={"/user/album"}><FaUserCircle className='userIcon' onClick={deletehandler} />
                    {user.userData ? <p className='mobile'>{user.userData.name}</p> : null}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        }
      </div>
      
    </div>
    <div className='Nav_mobile' ref={modal01} onClick={modalhandler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    <div className='Nav_modal' ref={modal02} onClick={deletehandler}></div>
  </div>;
}

export default Nav;
