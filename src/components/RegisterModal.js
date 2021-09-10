import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API, setAuthToken } from '../config/api'

const RegisterModal = ({ visibleRegisterModal, setVisibleRegisterModal, setVisibleLoginModal }) => {
	const history = useHistory()
	const onHideRegister = () => setVisibleRegisterModal(!visibleRegisterModal)
	const [ message, setMessage] = useState()
	const [register, setRegister] = useState({
		fullName: '',
		email: '',
		password: ''
	})

	const {	fullName, email, password } = register

	const onChangeRegister = (e) => {
		setRegister({
			...register,
			[e.target.name]: e.target.value
		})
	}
	const onClickLogin = () => {
		setVisibleRegisterModal(!visibleRegisterModal)
		setVisibleLoginModal(true)
	}

	const onSubmitRegister = async (e) => {
		e.preventDefault()
		try {      
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
	  
			const body = JSON.stringify({
				fullName,
				email,
				password 

			})
	  
			const response = await API.post("/register", body, config)
			console.log(response)
	  
			setMessage(response.data.message)
	  
			// if(response.data.status === 'success') {
			//     alert('Login Successfull')
			// }
			// console.log(localStorage.token)
			// console.log(response.data.data.user.token)
	  
	  
			// setAuthToken(response.data.data.user.token)
	  
			// dispatch({
			// 	type: "login_success", 
			// 	payload: {...response.data.data.user, token: response.data.data.user.token}
			// })
			
			history.push("/")
	  
			  } catch (error) {
			  console.log(error.message)
			  }
		}


	return visibleRegisterModal && (
		<div className="lp-modal">
			<div className="overlay" onClick={ onHideRegister } />
			<div className="lp-modal-content-register">
		<h1 className="lp-modal-title">Register</h1>

		<form onSubmit={ onSubmitRegister }>
		{
			message && 
			<div  class="alert alert-danger" role="alert">
			{message}
			</div>
		}
		<div className="form-group-modal">
        	<input type="email" placeholder="Email" name="email" value={ register.email } autoComplete="off" required="on" onChange={ onChangeRegister } />
        </div>
        <div className="form-group-modal">
            <input type="password" placeholder="Password" name="password" value={ register.password } autoComplete="off" required="on" onChange={ onChangeRegister } />
    	</div>
		<div className="form-group-modal">
            <input type="text" placeholder="Fullname" name="fullName" value={ register.fullName } autoComplete="off" required="on" onChange={ onChangeRegister } />
        </div>

		<div className="form-group-modal">
			<button type="submit">
            Register
            </button>
		</div>

		</form>
			<p className="lp-click-here">Already have an account ? Click <span onClick={ onClickLogin }>Here</span></p>
		</div>

		</div>

	)
}

export default RegisterModal








			// let registered;
			// if (localStorage.getItem('user')===null)
			// {
			// 	registered = [];
			// }
			// else
			// {
			// 	registered = JSON.parse(localStorage.getItem('user'));		
			// }
			// registered.push(register);	
			// localStorage.setItem('user',JSON.stringify(registered));
			// setRegister({ fullName: '', email: '', password: ''})
			// alert('register success')

// const [error, setError] = useState('')

// import Loading from './Loading'


// const [send, setSend] = useState(false)
// { send ? <span style={{ position: 'relative', left: '48%' }}>
// <Loading  type="spin" color="#eaeaea" width={ 25 } height={ 25 } />
// </span> : '' }



// import { server, setTokenHeaders } from '../config/axios'
// import { UserContext } from '../context/UserContext'

	// const [state, dispatch] = useContext(UserContext)


	// setSend(true)
			// const headers = { headers: { 'Content-Type': 'application/json' } }
			// const body = JSON.stringify(register)
			// const res = await server.post('/register', body, headers)
			// console.log(res)
		
// saveContext(res)	


	// 		if (error.hasOwnProperty('response')) {
	// 			console.log(error.response.data.message)
    //     setError(error.response.data.message)
    //   } else {
    //   }


	// finally {
	// 	setTimeout(() => setError(''), 5000)
	// 	setSend(false)
	// }
	
	// const saveContext = ({ status, data }) => {
	// 	console.log(status, data)
	// 	if (status === 201) {
	// 		dispatch({
	// 			type: 'login_success',
	// 			payload: data.user
	// 		})
	// 		localStorage.setItem('token', data.user.token)
    //   setTokenHeaders(data.user.token)
	// 	}
		// setRegister({ fullName: '', email: '', password: ''})
	// }


				/* { error && <p className="error-message">{ error }</p> } */



// return (
	// Isikan nama siswa: 
	// <input type=”text” id=”nama”/> 
	// <button id=”isikan”>Isikan</button>
	// <br><span id=”pesan”></span>
// 	)

// 	document.querySelector('#isikan').addEventListener('click',function(e)
// 	{	
// 		let siswa_baru = document.querySelector('#nama');
		
// 		let daftar_nama;

// 		if (localStorage.getItem('daftar_nama')===null)
// 		{
// 			daftar_nama = [];
// 		}
// 		else
// 		{
// 			daftar_nama = JSON.parse(localStorage.getItem('daftar_nama'));	
// 		}
		
// 		daftar_nama.push(siswa_baru.value);	
// 		localStorage.setItem('daftar_nama',JSON.stringify(daftar_nama));
		
// 		let pesan = document.querySelector('#pesan');		
// 		pesan.innerHTML = siswa_baru.value + " berhasil disimpan";
// 	});

// 	document.querySelector('#ambil').addEventListener('click',function(e)
// 	{		
// 		let tampilan = document.querySelector('ul#tampilan');
	
// 		daftar_nama = JSON.parse(localStorage.getItem('daftar_nama'));
// 		daftar_nama.forEach(function(nama){
// 			let myli = document.createElement('li');
// 			//console.log(nama);
// 			myli.innerHTML = nama;
// 			tampilan.appendChild(myli);
// 		});
		
// 	});