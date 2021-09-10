import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

import { API, setAuthToken } from '../config/api'

import '../css/LoginRegisterModal.css'

const LoginModal = ({ visibleLoginModal, setVisibleLoginModal, setVisibleRegisterModal }) => {
  const [state , dispatch] = useContext(UserContext)
  const history = useHistory()
  const [input, setInput] = useState({ email: '', password: '' })
  const [ message, setMessage] = useState()

  const {email,password} = input;

  const onHideLogin = () => setVisibleLoginModal(!visibleLoginModal)
  
  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const onSubmitLogin = async (e) => {
    // e.preventDefault()
    try {
      e.preventDefault();

      const config = {
          headers: {
              "Content-type": "application/json"
          }
      }

      const body = JSON.stringify({
          email,
          password
      })

      const response = await API.post("/login", body, config)
      console.log(response)

      setMessage(response.data.message)

      console.log(response.data.message)
      // if(response.data.status === 'success') {
      //     alert('Login Successfull')
      // }
      // console.log(localStorage.token)


      setAuthToken(response.data.data.user.token)
      
      dispatch({
          type: "login_success", 
          payload: {...response.data.data.user, token: response.data.data.user.token}
      })   
   
      
      history.push("/")
      
      
		} catch (error) {
        console.log(error.message)
		}
  }

  const onClickRegister = () => {
    setVisibleLoginModal(!visibleLoginModal)
    setVisibleRegisterModal(true)
  }
  
  return visibleLoginModal && (
    <div className="lp-modal">
      <div className="overlay" onClick={ onHideLogin } />
      <section className="lp-modal-content-login">
        <h1 className="lp-modal-title">Login</h1> 
        <form onSubmit={ onSubmitLogin }>
            {
            message && 
            <div class="alert alert-danger" role="alert">
            {message}
            </div>
          }  
          <div className="form-group-modal">
            <input type="email" placeholder="Email" name="email" value={ input.email } onChange={ onChangeInput } required="on" />
          </div>
          <div className="form-group-modal">
            <input type="password" placeholder="Password" name="password" value={ input.password } onChange={ onChangeInput } required="on" />
          </div>
          <div className="form-group-modal">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="lp-click-here">Don't have an account ? Click <span onClick={ onClickRegister }>Here</span></p>
      </section>
    </div>
  )
}

export default LoginModal







			// const users =  JSON.parse(localStorage.getItem('user'))
      // const user = users.find((user) => user.email === input.email &&  user.password === input.password)

      // console.log(user);
			// if (user) {
			// 	alert('login succes');
      //   history.push('/');   
      //   dispatch({
      //     type: 'login_success',
      //     payload: user
      //   })
      //   setInput({ email: '', password: '' });
			// } 
			// else
			// {
			// 	alert('Email  or password is wrong')	
			// }



  // const [state, dispatch] = useContext(UserContext)


// import { UserContext } from '../context/UserContext'
// import { server, setTokenHeaders } from '../config/axios'

  // const [isLoading, setLoading] = useState(false)
  // const [error, setError] = useState('')



    //  { error && <p className="error-message">{ error }</p> }

    // e.preventDefault()
    // try {
    //   setLoading(true)
    //   const res = await server.post('/login', input)
    //   const token = res.data.user.token
    //   localStorage.setItem('token', token)
    //   setTokenHeaders(token)
    //   dispatch({
		// 		type: 'login_success',
		// 		payload: res?.data.user
		// 	})
    //   setInput({ email: '', password: '' })
    // } catch (error) {
    //   if (error.hasOwnProperty('response')) {
    //     setError(error?.response.data.message)
    //   } else {
    //     console.log(error.message)
    //   }
    // } finally {
    //   setTimeout(() => setError(''), 5000)
    //   setLoading(false)
    // }