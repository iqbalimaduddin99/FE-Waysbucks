import { useState } from 'react'
import '../css/AddProduct.css'
import { Alert, Form, Button, InputGroup, FormControl} from 'react-bootstrap'
import { useHistory } from 'react-router'
// import Loading from './Loading'
import Image from '../assets/Rectangle 4.png'

import Vector from '../assets/Vector.png'
import { API } from '../config/api'

const AddProduct = () => {

	const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({
    title: '',
    price: '',
    imageFile: '',
})

  
  const {title , price , imageFile } = form

  const onChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
      })
      
    if(e.target.type === "file" ){
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
  }
}

	const onSubmitProduct = async (e) => {
	
		try {
      e.preventDefault()
      const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }
  
    const formData = new FormData()
    formData.set("title", form.title)
    formData.set("price", form.price)
    formData.set("imageFile", form.imageFile[0], form.imageFile[0].name)

  
    await API.post('/product',  formData, config)
    

		setForm({ title: '', price: '', imageFile: ''})

    setError(['primary'].map((variant, idx) => (
      <Alert className="alert-product" key={idx} variant={variant}>
        Add Topping Succes  
      </Alert>
      )))
		} catch (error) {
        console.log(error.message)
		}
	}
  
  return (
<div className="product">
    <h2 className="p-title">Add Product</h2>
  { error && <p>{ error }</p> }
    <Form onSubmit={ onSubmitProduct }>

      <Form.Group className="form-product" controlId="formBasicEmail">
        <Form.Control type="text" name="title" value ={ title }  placeholder="Product Name" onChange={ onChangeInput }  required="on"/>
      </Form.Group> 
      <Form.Group className="form-product2" controlId="formBasicPassword">
        <Form.Control type="text"  name = "price"  value = { price } placeholder="Price" onChange={ onChangeInput } />
      </Form.Group>
      <Form.Group className="form-product3">
        <div className="fileUpload btn "> 
        <span><img src={Vector} /></span>
        <input  type="file" className="upload" name="imageFile" onChange={ onChangeInput }  />
        </div>
      </Form.Group>
      <button className="submit" type="submit">
        Add Product
      </button>
    </Form>
  <div>
    {preview && <img className="img-product" src={preview}  />}
  </div>
</div>
  )
}

export default AddProduct









   
			// let product;
			// if (localStorage.getItem('product')===null)
			// { product = [] }
			// else
			// { product = JSON.parse(localStorage.getItem('product')) }
			// product.push(input);	
			// localStorage.setItem('product',JSON.stringify(product));
