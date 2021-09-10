import { useState } from 'react'
import '../css/AddProduct.css'
import { Alert, Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router'
// import Loading from './Loading'

import Image from '../assets/Rectangle 4.png'
import { API } from '../config/api'
import Vector from '../assets/Vector.png'

const AddTopping = () => {

  let history = useHistory();

//   const goToFeed = () => {
//     alert('Create post successfull')
//     history.push('/')
// }
	const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const [input, setInput] = useState({
    NameTopping: '', Price: '', imageFile: ''
  })

  const {NameTopping , Price , imageFile } = input
  const onChangeInput = (e) => {
    setInput({
      ...input,
    [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
    })

    if(e.target.type === "file"){
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
}

	const onSubmitProduct = async (e) => {
		e.preventDefault()
		try {
            
      const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }

    const formData = new FormData()
    formData.set("title", NameTopping)
    formData.set("price", Price)
    formData.set("imageFile", imageFile[0], imageFile[0].name)

    await API.post('/topping', formData, config)

    // goToFeed();

			setInput({ NameTopping: '', Price: '', imageFile: ''})


      setError(     ['danger'].map((variant, idx) => (
        <Alert className="alert" key={idx} variant={variant}>
          Add Topping Succes  
        </Alert>
      )))
		} catch (error) {
        console.log(error.message)
		}
	}
  
  return (
<div className="product">
    <h2 className="p-title">Add Topping</h2>
  { error && <p>{ error }</p> }
    <Form onSubmit={ onSubmitProduct }>

      <Form.Group className="form-product" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Topping Name" onChange={ onChangeInput }  name="NameTopping" />
      </Form.Group>
      <Form.Group className="form-product2" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Price" onChange={ onChangeInput }  name="Price" required="on" />
      </Form.Group>
      <Form.Group className="form-product3">
        <div className="fileUpload btn "> 
        <span><img src={Vector} /></span>
        <input  type="file" className="upload" name="imageFile" onChange={ onChangeInput }  />
        </div>
      </Form.Group>
      <button className="submit" type="submit">
        Add Topping
      </button>
    </Form>
  <div>
    {preview && <img className="img-product" src={preview}  />}
  </div>
</div>
  )
}

export default AddTopping


















			// let product;
			// if (localStorage.getItem('product')===null)
			// { product = [] }
			// else
			// { product = JSON.parse(localStorage.getItem('product')) }
			// product.push(input);	
			// localStorage.setItem('product',JSON.stringify(product));