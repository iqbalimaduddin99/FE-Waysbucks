import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import LogoShapes from '../assets/WaysBucks 1.png'
import DropdownHeader from './Dropdown'
import { UserContext } from '../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUser } from '@fortawesome/free-solid-svg-icons'

import Basket from '../assets/Group.png'
import Slice1 from '../assets/Slice 1 1.png'
import Slice2 from '../assets/Slice 2 1.png'
import Slice3 from '../assets/Slice 3 1.png'
import Slice4 from '../assets/Slice 4 1.png'

import { DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap'
import '../css/Navbar.css'
import '../css/HeaderLanding.css'


const HeaderLanding = () => {
  const image = 'http://localhost:1000/public/image/'
  const history = useHistory()
  const [show, setShow] = useState(false)
  const [state] = useContext(UserContext)
  const onClickShow = () => setShow(!show)

  console.log(state.user)
  return (
      <nav className="lp-nav">
        <section className="lp-icon">    
        <img src={ LogoShapes } alt="icon-side" onClick={ () => history.push('/') }/>
        </section>

        { (state.user.fullName === 'Admin') ?
         <section >   
            <img src={ image + state.user.image } className="lp-btn-profile-admin" alt="profile-pic" onClick={ onClickShow }/>
            <FontAwesomeIcon icon={faUser} className="lp-btn-profile-admin"/>
          <DropdownHeader show={ show } setShow={ setShow } context={ state } />
        </section>
        :
        <section>
            <img className="lp-btn-cart"  src={Basket} onClick={ () => history.push('/cart') }/>
            <img src={ image + state.user.image }  className="lp-btn-profile" alt="profile-pic" onClick={ onClickShow }/>
            <DropdownHeader show={ show } setShow={ setShow } context={ state } />
        </section>}
      </nav>
  )
}

export default HeaderLanding
