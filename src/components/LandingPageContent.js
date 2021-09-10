import React, { useContext, useEffect, useState } from 'react'
import { Row, Card, Col, Container, Button } from 'react-bootstrap'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
// import Loading from '../../../Trash/soon/Loading'
import '../css/LandingPage.css'
import { useHistory } from 'react-router'
import { API } from '../config/api'
import { UserContext } from '../context/UserContext'


import Slice1 from '../assets/Slice 1 1.png'
import Slice2 from '../assets/Slice 2 1.png'
import Slice3 from '../assets/Slice 3 1.png'
import Slice4 from '../assets/Slice 4 1.png'

const LandingPageContent = () => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const [visibleRegisterModal, setVisibleRegisterModal] = useState(false)
  // const [isLoading, setLoading] = useState('')
  const [products, setProducts] = useState()
  const image = 'http://localhost:1000/public/image/'
  const history = useHistory()
  const [state, dispatch] = useContext(UserContext)
  
  const handleDetailProduct = (id) => {
    history.push(`/detail-product/${id}`)
  }


  useEffect(() => {
    getProducts()
    return () => setProducts()
  }, [])

  const getProducts = async () => {
    try {	
      const res = await API.get('/products')
      
      console.log(res)
      setProducts(res.data.data.products)

      // const product = JSON.parse(localStorage.getItem('product'))
      // setProducts(product)

    } catch (error) {
      console.log(error?.response)
    } 
    // finally {
    //   setLoading('')
    // }
  }

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)

  return (
    <main className="lp-body">
      <LoginModal
        visibleLoginModal={ visibleLoginModal }
        setVisibleLoginModal={ setVisibleLoginModal }
        setVisibleRegisterModal={ setVisibleRegisterModal }
      />
      <RegisterModal
        visibleRegisterModal={ visibleRegisterModal }
        setVisibleRegisterModal={ setVisibleRegisterModal }
        setVisibleLoginModal={ setVisibleLoginModal }
      />


      <section className="lp-rectangle">
        <img src={ Slice1 } className="lp-rectangle1" alt="icon-side" />
        <img src={ Slice2 } className="lp-rectangle2" alt="icon-side" />
        <img src={ Slice3 } className="lp-rectangle3" alt="icon-side" />
        <img src={ Slice4 } className="lp-rectangle4" alt="icon-side" />  
      <section className="lp-text-jumbotron">
        <p className="lp-text-title">WaysBucks</p>
        <br></br>
        <p className="lp-text-second">Things are changing, but we’re still here for you</p>
        <br></br>
        <p className="lp-text-second">We have temporarily closed our in-store cafes, but 
        <br></br>
        select grocery and drive-thru locations remaining open.<br></br> 
        Waysbucks Drivers is also available 
        <br></br>
        <br></br>
        Let’s Order...</p>
        <p className="lpb-title">Let’s Order...</p>
      </section>
      </section>
      <section className="lp-image">
      </section>


{
  (state.user.fullName === 'Admin') &&
  <main className="lp-body">
      <section className="lpb-wrapper-product">
      <Container>
        <Row>
        { products?.map((product, i) => (
            <Col  lg={3} className="lpb-card-product" key={ i } onClick = {() => history.push('/add-product')} >
              <img src={image + product.image} alt="photo product" className="lpb-card-img" />
              <div className="lpb-product-ty">
                <p className="lpb-title-product">
                  { (product.title > 13)? `${product.title}...` : product.title  }
                </p>
              </div>
              <p>
                { product.price }
              </p>
            </Col>
          ))
        }
      </Row>
      </Container>
      </section>
    </main>}

    
{
  (state.isLogin === true && state.user.fullName !== 'Admin' ) &&
  <main className="lp-body">
      <section className="lpb-wrapper-product">
      <Container>
        <Row>
        { products?.map((product, i) => (
            <Col lg={3} className="lpb-card-product" key={ i } onClick = {()=>{handleDetailProduct(product.id)}} >
              <img src={image + product.image} alt="photo product" className="lpb-card-img" />
              <div className="lpb-product-ty">
                <p className="lpb-title-product">
                  { (product.title > 13)? `${product.title}...` : product.title  }
                </p>
              </div>
              <p>
                { product.price }
              </p>
            </Col>
          ))
        }
        </Row>
      </Container>
      </section>
    </main>}

{ (state.isLogin === false)  &&    
    <section className="lpb-wrapper-product">
        {/* { isLoading && <Loading type="spin" color="#eaeaea" /> } */}
      <Container>
        <Row>
        { products?.map((product, i) => (
            <Col lg={3} className="lpb-card-product" key={ i } onClick={ onClickLogin }>
              <img src={image + product.image}  className="lpb-card-img" />
              <div className="lpb-product-ty">
                <p className="lpb-title-product">
                  { (product.title > 13)? `${product.title}...` : product.title  }
                </p>
              </div>
              <p>
                { product.price }
              </p>
            </Col>
          ))
        }
        </Row>
      </Container>
      </section>}
    </main>


  )
}

export default LandingPageContent




