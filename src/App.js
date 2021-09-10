import { useContext, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom"
import { UserContext } from "./context/UserContext"
import Home from './pages/Home'
import PrivateRoute from "./pages/PrivateRoute"


import { API, setAuthToken } from './config/api'

// if (localStorage.getItem('token'))
// setAuthToken(localStorage.getItem('token'))
if (localStorage.token) {
  setAuthToken(localStorage.token)
  }

export default function App() {
  const [state, dispatch] = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    const cekAuthorization = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await API.get('/authorization')
        
      // let payload = res.data.data.user
      // payload.token = localStorage.token
      // console.log(payload)
        console.log(res)
        dispatch({
          type: 'login_success',
          payload : { ...res.data.data.user, token }
        })
      } catch (error) {
        console.log(error)
        if (error.status === 'failed ') {
          dispatch({
            type: 'logout',
            payload: {}
          })
          history.push('/')
        }
      }
    }
    cekAuthorization()
  }, [])

  return (
  <Router>
    <Switch>
    {state.isLogin ?
      <PrivateRoute />
      :
      <Route exact path="/" component={ Home } />  }
  </Switch>
  </Router>
    )
}














  


// function App() {
//   const [state, dispatch] = useContext(UserContext);

//   const checkUser = async () => {
//     try {
//       const response = await API.get('/check-auth')
      
//       console.log(response)
//       console.log(response.data.data.user)

//       console.log(localStorage.token)

//       let payload = response.data.data.user
//       payload.token = localStorage.token
//       console.log(payload)

//       dispatch({
//         type: "USER_SUCCESS",
//         payload
//       })

//     } catch (error) {
//       console.log(error.response)
//     }
//   }

//   console.log(state)

//   useEffect(()=>{
//     checkUser()
//   },[])

