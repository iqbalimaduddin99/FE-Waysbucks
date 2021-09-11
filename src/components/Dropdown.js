import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { IoIosLogOut } from 'react-icons/io'
import { BsListCheck } from 'react-icons/bs'
import { DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap'
import ToppingImg from '../assets/topping 1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

import '../css/DropDown.css'
import { UserContext } from '../context/UserContext'

const DropdownHeader = ({ show, setShow, context: {user} }) => {
  const [state, dispatch] = useContext(UserContext)
  const onHideLogin = () => setShow(!show)
  const history = useHistory()
  console.log(user)
	return show && (
<div> 
	{ (user.fullName === "Admin") ?
		<div>  
			<div className="overlay" onClick={ onHideLogin } />
				<div  className="dropdownheader">
					<Dropdown.Item eventKey="1" onClick={ () => history.push('/') } >Home</Dropdown.Item>
					<Dropdown.Item eventKey="1" onClick={ () => history.push('/add-product') } >Add Product</Dropdown.Item>
					<Dropdown.Item eventKey="1" onClick={ () => history.push('/add-topping') } >Add Topping</Dropdown.Item>
					<Dropdown.Item eventKey="1" onClick={ () => history.push('/transaction') } >Transaction</Dropdown.Item>
					<hr className="dd-divider" />
						<section className="dd-logout" >
					<Dropdown.Item eventKey="1" onClick={ () => history.push('/logout') } ><IoIosLogOut className="dd-icon" onClick={ () => history.push('/') } /> Logout</Dropdown.Item>
						</section>
				</div>
			</div>
		:
		<div>
		<div className="overlay" onClick={ onHideLogin } />
			<div  className="dropdownheader">
				<Dropdown.Item eventKey="1" onClick={ () => history.push('/') } >Home</Dropdown.Item>
				<Dropdown.Item eventKey="1" onClick={ () => history.push('/profile') } >Profile</Dropdown.Item>
				<hr className="dd-divider" />
				<section className="dd-logout" >
				<Dropdown.Item eventKey="1" onClick={ () => history.push('/logout') } ><IoIosLogOut className="dd-icon" onClick={ () => history.push('/logout') } /> Logout</Dropdown.Item>
				</section>
			</div>
		</div>
	}
</div>
	
	)
}

export default DropdownHeader







// import PayIcon from '../image/pay.png'
// import ArtistIcon from '../image/art-icon.png'
// import MusicIcon from '../image/music-icon.png'
      
					/* <section className="dd-route">
				<div className="dd-route-group">

					<span >Pay</span>
				</div>
				<div className="dd-route-group">
					<BsListCheck className="dd-icon" onClick={ () => history.push('/history-payment') } />
					<span onClick={ () => history.push('/history-payment') }>List Transaction</span>
				</div>
			</section> */
		
