import React, { Fragment, useContext, useState, } from 'react';
import { useHistory } from 'react-router-dom'
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'

const Create = () => {

  const [productName , setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image , setImage] = useState('')
  const [valid , setValid] = useState('')

  const history = useHistory();

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image,'image ready to uploaded....')
    if(productName == '' || category == '' || price == '' || image == ''){
      console.log('fill the required fields.......')
      setValid('Please fill required fields!')
      setTimeout(() => {
        console.log('setTimeout is calling.....')
        setValid('')
      }, 3000);
      return;
    }else{

      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url,'Uploaded image url ')
          const date = new Date()
          firebase
            .firestore()
            .collection("products")
            .add({
              productName,
              category,
              price,
              url,
              userId:user.uid,
              createdAt:date.toDateString()
            }).then((res)=>{
              console.log('file upload completed ..')
              history.push('/')
            })
        })
      })
    

    }
    
      
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv" >
        <p  style={{ color: "red",position:"absolute",top:"30px" }}>{valid}</p>
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="Name"
              onChange={(e)=>{setProductName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input onChange={(e)=>{setPrice(e.target.value)}} className="input" type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          {image ? <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>:''}
          <form>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" accept="image/*"/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
