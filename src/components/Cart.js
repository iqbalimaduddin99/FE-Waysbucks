import React, { useEffect, useState } from 'react'

// import Loading from '../../../Trash/soon/Loading'
import '../css/Cart.css'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row, Image } from 'react-bootstrap'

import thumbnail from "../assets/Rectangle 5.png";
import trashImage from "../assets/bin 1.png";
import transactionLogo from "../assets/invoices 1.png";
const LandingPageContent = () => {


  return (
    
<Container> 
    <Row>  
        <Col xs={7}>
        <div className="cart">
            <h2 className="p-title">My Cart</h2>
        </div>
        <div  className="desc-cart"> 
        <p>Review Your Order</p>
        </div>
        <div className="card-order">
        <Image src={thumbnail} />
              <div className="card-mid-order">
                <p className="my-0 title-order ">Ice Coffe Palm Sugar</p>
                <p className="my-0 toping-order">
                  <span>Toping: </span>Bill Berry Boba, Bubble Tea Gelatin,
                </p>
              </div>
              <div className="card-right-order">
                <p>Rp.33.000</p>
                <Image src={trashImage} style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className="card-order">
              <Image src={thumbnail} />
              <div className="card-mid-order">
                <p className="my-0 title-order ">Ice Coffe Palm Sugar</p>
                <p className="my-0 toping-order">
                  <span>Toping: </span>Bill Berry Boba, Bubble Tea Gelatin,
                </p>
              </div>
              <div className="card-right-order">
                <p>Rp.33.000</p>
                <Image src={trashImage} style={{ cursor: "pointer" }} />
              </div>
            </div>
          <div className="container-bottom-cart">
            <div>
              <div className="container-subtotal">
                <div className="container-inside-bottom-cart">
                  <p>Ini Total Harga</p>
                  <p>66.000</p>
                </div>
                <div className="container-inside-bottom-cart">
                  <p>Qty</p>
                  <p>2</p>
                </div>
              </div>
              <div className="container-inside-bottom-cart">
                <p>Total</p>
                <p>66.000</p>
              </div>
            </div>

            <div className="container-input-payment">
              <label className="label-input-payment">
                <Image src={transactionLogo} className="transaction-logo" />
                <p>Attache of Transaction</p>
                <input type="file" />
              </label>
            </div>
          </div>
        </Col>
        <Col>
            {/* { isLoading && <Loading type="spin" color="#eaeaea" /> } */}
            <div >       
            <Form className="cart-body-right">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <input  className="form-cart" type="text" placeholder="Name" />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <input className="form-cart" type="email" placeholder="Email" />
                </Form.Group> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <input  className="form-cart" type="number" placeholder="Phone" />
                </Form.Group> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <input  className="form-cart" type="text" placeholder="Pos Code" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <textarea className="form-cart-address" type="textarea"   placeholder="Address" rows={3} />
                </Form.Group>
                <button className="submit-cart" type="submit" >
                    Pay
                </button>
            </Form>
            </div>
        </Col>
    </Row>  
</Container>

    
  )
}

export default LandingPageContent
