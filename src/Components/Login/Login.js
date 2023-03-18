import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context'
import './Login.css';

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [valid,setValid] = useState('')
  const history = useHistory()
  const inpPassword = useRef(null)

  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e){
    e.preventDefault()
    if(email == '' || password == ''){
      setValid('Please fill required!')
      setTimeout(() => {
        console.log('setTimeout is calling.....')
        setValid('')
      }, 3000);
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
      console.log(res,'response login....')
      history.push('/')
    }).catch((err)=>{
      console.log(err.message, 'login error.....')
      if(err.message == 'There is no user record corresponding to this identifier.'){
        setValid('User not found !')
        setPassword('')
        setTimeout(() => {
          setValid('')
        }, 3000);
      }else if(err.message == 'The password is invalid or the user does not have a password.'){

        setValid('Invalid password!')
        setPassword('')
        inpPassword.current.focus()
        setTimeout(() => {
          console.log('setTimeout is calling.....')
          setValid('')
        }, 3000);
      }else{
        console.log(err.message,'error in login validation .')
        setValid('Oops something wrong!')
        setPassword('')
        setTimeout(() => {
          setValid('')
        }, 3000);
      }
    })

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <p  style={{ color: "red",position:"absolute",top:"210px" }}>{valid}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            autoComplete='off'
            className="input"
            name="email"
            onChange={(e)=>{ setEmail(e.target.value) }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            ref={inpPassword}
            autoComplete='off'
            className="input"
            name="password"
            value={password}
            onChange={(e)=>{ setPassword(e.target.value) }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a type="button" onClick={()=>{
          history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
