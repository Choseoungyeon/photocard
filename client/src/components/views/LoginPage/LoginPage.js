import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import form_decoration from '../../../img/Form/form_decoration.svg'
import "./LoginPageModule.css"

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler =(event)=>{
        setEmail(event.target.value)
    }

    const onPasswordHandler =(event)=>{
        setPassword(event.target.value)
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }
        
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate('/')
                } else {
                    alert('Error˝')
                }
            })
        
        }

    return (
        <div className='form_wrap'>
            <div className='form_container'>
                <img className='form_decoration' src={form_decoration} alt="form_decoration"/>
                <h2>LogIn</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faUser} /></label>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
                    </div>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faLock} /></label>
                        <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
                    </div>
                    <p><Link to={"/register"}>Register now</Link></p>
                    <br />
                    <button type='submit' style={{ display: "block" }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
