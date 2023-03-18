import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import "./Signup.css";

export default function Signup() {

  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const { firebase } = useContext(FirebaseContext);

  const [valid,setValid] = useState('');
  const inpName = useRef()
  const inpEmail = useRef()
  const inpPhone = useRef()
  const inpPassword = useRef()

  function handleSubmit(e) {
    e.preventDefault();

    if(name == '' || email == '' || password == '' || phone == '' ){
      setValid('Please fill required fields !')
      setTimeout(() => {
        console.log('setTimeout is calling.....')
        setValid('')
      }, 3000);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name }).then((res) => {
          console.log(result.user.uid, "res from firebase....");
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: name,
              phone: phone,
            })
            .then((re) => {
              console.log("added into the database...");
              history.push("/login");
            });
        });
      }).catch((err)=>{
        console.log(err.message,'error message from the firebase.')
        if(err.message == 'The email address is already in use by another account.'){
          console.log(err.message,'error message from the if case.')
          setValid('Email is already taken !')
          setTimeout(() => {
            console.log('setTimeout is calling.....')
            setValid('')
          }, 3000);
          inpEmail.current.focus()
          console.log(valid)

        }else if(err.message == 'Password should be at least 6 characters'){
          console.log(err.message,'error message from the if case.')
          inpPassword.current.focus()
          setValid('Password should be 6 character !')
          setTimeout(() => {
            console.log('setTimeout is calling.....')
            setValid('')
          }, 3000);
          setPassword('')
          console.log(valid)

        }
      });
    console.log(firebase, "values from the firebase..");
    console.log(name, email, password, phone, "input form values submit....");
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <p  style={{ color: "red",position:"absolute",top:"210px" }}>{valid}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            autoComplete="off"
            className="input"
            type="text"
            name="name"
            ref={inpName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            ref={inpEmail}
            autoComplete="off"
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            ref={inpPhone}
            autoComplete="off"
            className="input"
            type="number"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            ref={inpPassword}
            autoComplete="off"
            className="input"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>{
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
