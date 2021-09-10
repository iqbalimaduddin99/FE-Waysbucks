import { useState } from 'react'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

import LogoShapes from '../assets/WaysBucks 1.png'
import '../css/Navbar.css'
import '../css/HeaderLanding.css'
import { useHistory } from 'react-router-dom'


export default function HeaderLanding() {
  const history = useHistory()
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const [visibleRegisterModal, setVisibleRegisterModal] = useState(false)

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)
  const onClickRegister = () => setVisibleRegisterModal(!visibleRegisterModal)

  
  return (       

    <header>
      <nav className="lp-nav">
          <section className="lp-icon">
            <img src={ LogoShapes } alt="icon-side" onClick={ () => history.push('/') }/>
          </section>
                
          <section className="lp-btn-group">
            <button type="button" className="lp-btn-login" onClick={ onClickLogin }>Login</button>
            <button type="button" className="lp-btn-register" onClick={ onClickRegister }>Register</button>
          </section> 
      </nav>

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

     
    </header>
  )
}