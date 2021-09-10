import { useEffect, useState } from 'react'
import '../css/AddProduct.css'
import '../css/Profile.css'
import { Alert, Form, Button} from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
// import Loading from './Loading'
import { API } from '../config/api'
import Image from '../assets/Rectangle 12.png'

const Profile = () => {
  const image = 'http://localhost:1000/public/image/'
  const [state, dispatch] = useContext(UserContext);
	const { id } = state.user; 
  const [ profile, setProfile] = useState()
  const user = state.user
  console.log(user)


  return (
<div className="product">
    <h2 className="p-title">Profile</h2>
  <div>
     <img  className="p-img" src={image + user.image} />
     <p className=".p-text-profile">Full Name</p>
     <p className='.p-text-profile1'>{user.fullName}</p>
     <p className='.p-text-profile2'>Email</p>
     <p className='.p-text-profile3'>{user.email}</p>
  </div>
  <div className="p-hist-transaction">


    
  </div>
</div>
  )
}

export default Profile








// const path = 'http://localhost:5000/uploads/';

// 	const { uid } = props;
// 	const isLike = false;
// 	const [show, setShow] = useState(false);
// 	const [feeds, setFeeds] = useState();
// 	const [send, setSend] = useState();
// 	const [likes, setLikes] = useState(); 




// 	useState(() => {
// 		getFeedFollow(uid);
// 	}, [uid]);
	
// 	const handleLike = () => console.log('oke')
// 	const handleDetailFeed = () => console.log('oke')




	// useEffect (() => {   
  //   const getUser = async () => {
	// 	try {
	// 		const response = await API.get(`/users`);
  //     console.log(response)
	// 		setProfile(response);
	// 	} catch (error) {
	// 		console.log(error?.response);
	// 	}
	// }},[])
