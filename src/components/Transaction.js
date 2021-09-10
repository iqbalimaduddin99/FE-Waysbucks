import { useState } from 'react'
import '../css/AddProduct.css'
import { Alert, Form, Button} from 'react-bootstrap'
// import Loading from './Loading'
import {Table} from 'react-bootstrap'
import Image from '../assets/Rectangle 4.png'

const AddProduct = () => {
	const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const [input, setInput] = useState({
    NameTopping: '', Price: '', PhotoProduct: ''
  })


  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]:  e.target.value
    })
  //   if(e.target.type === "file"){
  //     let url = URL.createObjectURL(e.target.files[0])
  //     setPreview(url)
  // }

  }

	const onSubmitProduct = async (e) => {
		e.preventDefault()
		try {
            
   
			let product;
			if (localStorage.getItem('product')===null)
			{ product = [] }
			else
			{ product = JSON.parse(localStorage.getItem('product')) }
			product.push(input);	
			localStorage.setItem('product',JSON.stringify(product));
			setInput({ NameTopping: '', Price: '', PhotoProduct: ''})
			// alert('add product success')
      setError(     ['danger'].map((variant, idx) => (
        <Alert key={idx} variant={variant}>
          Add Topping Succes  
        </Alert>
      )))
		} catch (error) {
        console.log(error.message)
		}
	}
  
  return (
<div className="product">
    <h2 className="p-title">Transaction</h2>
  { error && <p>{ error }</p> }
<Table striped bordered hover>
  <thead>
    <tr>
      <th>No</th>
      <th>Name</th>
      <th>Address</th>
      <th>Post Code</th>
      <th>Income</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Jl. Tengah</td>
      <td>5543</td>
      <td>27.000</td>
      <td>Waiting</td>
      <td>
      <Button variant="primary" type="submit">
        Cancel
      </Button><Button variant="primary" type="submit">
        Approve
      </Button>
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jojo</td>
      <td>Jl. Tengah</td>
      <td>5543</td>
      <td>27.000</td>
      <td>Waiting</td>
      <td>
      <Button variant="primary" type="submit">
        Cancel
      </Button><Button variant="primary" type="submit">
        Approve
      </Button>
      </td>
    </tr> <tr>
      <td>3</td>
      <td>Kanda</td>
      <td>Jl. Tengah</td>
      <td>5543</td>
      <td>27.000</td>
      <td>Waiting</td>
      <td>
      <Button variant="primary" type="submit">
        Cancel
      </Button><Button variant="primary" type="submit">
        Approve
      </Button>
      </td>
    </tr> <tr>
      <td>4</td>
      <td>Lala</td>
      <td>Jl. Tengah</td>
      <td>5543</td>
      <td>27.000</td>
      <td>Waiting</td>
      <td>
      <Button variant="primary" type="submit">
        Cancel
      </Button><Button variant="primary" type="submit">
        Approve
      </Button>
      </td>
    </tr>
  </tbody>
</Table>
   
 
</div>
  )
}

export default AddProduct
