// import { useEffect, useState } from 'react'
// import '../css/AddProduct.css'
import '../css/Profile.css'
// import { Alert, Form, Button} from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
// // import Loading from './Loading'
import { API } from '../config/api'
// import Image from '../assets/Rectangle 12.png'

// const Profile = () => {
//   const image = 'http://localhost:1000/public/image/'
//   const [state, dispatch] = useContext(UserContext);
// 	const { id } = state.user; 
//   const [ profile, setProfile] = useState()
//   const user = state.user
//   console.log(user)


//   return (
// <div className="product">
//     <h2 className="p-title">Profile</h2>
//   <div>
//      <img  className="p-img" src={image + user.image} />
//      <p className=".p-text-profile">Full Name</p>
//      <p className='.p-text-profile1'>{user.fullName}</p>
//      <p className='.p-text-profile2'>Email</p>
//      <p className='.p-text-profile3'>{user.email}</p>
//   </div>
//   <div className="p-hist-transaction">


    
//   </div>
// </div>
//   )
// }

// export default Profile






import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import Photo from "../assets/Rectangle 12.png";
import DrinkPhoto from "../assets/Rectangle 5.png";
import logo from "../assets/Logo WaysBucks.svg";
import barcode from "../assets/Group 10.png";

function ContentProfile() {
  const image = 'http://localhost:1000/public/image/'
  const [state, dispatch] = useContext(UserContext);
	const { id } = state.user; 
//  const [ profile, setProfile] = useState()
  const user = state.user
  return (
    <Container>
      <Row className="p-5 mx-5 text-dark">
        <Col>
          <p className="text-title-right">My Profile</p>
          <Row>
            <Col>
              <Image
                src={image + user.image}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Col>
            <Col>
              <Row>
                <p className="fullname-title">Full Name</p>
                <p className="fullname-text">{user.fullName}</p>
              </Row>
              <Row>
                <p className="fullname-title">Email</p>
                <p className="fullname-text">{user.email}</p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <p className="text-title-left">My Transaction</p>
          <div className="detail-drink-list">
            <div>
              <div className="container-drink-list">
                <div className="image-drink">
                  <Image src={DrinkPhoto} />
                </div>
                <div className="container-detail-drink-left">
                  <p className="title-detail-drink">Ice Coffe Palm Sugar</p>
                  <p className="title-2-detail-drink">
                    <strong>Saturday,</strong> 5 March 2020
                  </p>
                  <p className="title-3-detail-drink">
                    <strong>Toping :</strong>{" "}
                    <span style={{ color: "#BD0707" }}>
                      Bill Berry Boba, Bubble Tea Gelatin
                    </span>
                  </p>
                  <p className="title-4-detail-drink">Price : Rp.33.000</p>
                </div>
              </div>

              <div className="container-drink-list">
                <div className="image-drink">
                  <Image src={DrinkPhoto} />
                </div>
                <div className="container-detail-drink-left">
                  <p className="title-detail-drink">Ice Coffe Palm Sugar</p>
                  <p className="title-2-detail-drink">
                    <strong>Saturday,</strong> 5 March 2020
                  </p>
                  <p className="title-3-detail-drink">
                    <strong>Toping :</strong>{" "}
                    <span style={{ color: "#BD0707" }}>
                      Bill Berry Boba, Bubble Tea Gelatin
                    </span>
                  </p>
                  <p className="title-4-detail-drink">Price : Rp.33.000</p>
                </div>
              </div>
            </div>

            <div className="right-detail-drink-container">
              <div>
                <Image
                  src={logo}
                  style={{
                    width: "50px",
                    marginBottom: "20px",
                    marginTop: "15px",
                  }}
                />
              </div>
              <div>
                <Image
                  src={barcode}
                  style={{ width: "50px", marginBottom: "10px" }}
                />
              </div>
              <div className="order-status">
                <p>On The Way</p>
              </div>
              {/* <p className="order-status">On The Way</p> */}
              <p className="subtotal-drink-list">Sub Total : 69.000</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContentProfile;



