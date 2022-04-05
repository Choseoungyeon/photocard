import { useNavigate } from 'react-router-dom';
import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { registerUser} from '../../../_action/user_action';
import form_decoration from '../../../img/Form/form_decoration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "../LoginPage/LoginPageModule.css"

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler =(event)=>{
        setEmail(event.target.value)
    }

    const onPasswordHandler =(event)=>{
        setPassword(event.target.value)
    }

    const onNameHandler =(event)=>{
        setName(event.target.value)
    }

    const onConfirmPasswordHandler =(event)=>{
        setConfirmPassword(event.target.value)
    }

    const onSubmitHandler = (event)=>{
        if(Password.length === 0 ||
            Name.length === 0 ||
            ConfirmPassword.length === 0 ||
            Email.length === 0) return alert('내용을 전부 입력해주세요')

        if(Password !== ConfirmPassword) return alert('비밀번호와 비밀번호 확인은 같아야합니다.')

        event.preventDefault();
        let body = {
            email: Email,
            password: Password,
            name:Name
        }
    
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/')
                } else {
                    alert('Failed to sign up')
                }
            })
        
        }

    return (
        <div className='form_wrap'>
            <div className='form_container'>
                <img className='form_decoration' src={form_decoration} alt="form_decoration" />
                <h2 style={{ marginBottom: "55px" }}>Sign up</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faEnvelope} /></label>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder="email" />
                    </div>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faUser} /></label>
                        <input type="text" value={Name} onChange={onNameHandler} placeholder="Name"/>
                    </div>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faLock} /></label>
                        <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/>
                    </div>
                    <div className='form_subContainer'>
                        <label><FontAwesomeIcon style={{ width: 14, height: "auto" }} icon={faLock} /></label>
                        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="Password confirm" />
                    </div>
                    <button type='submit' style={{ marginTop: "57px" }}>
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage