import { useContext } from 'react'
// import { Switch, Route } from 'react-router-dom'
import { UserContext } from '../context/UserContext.js'


import HomeUser from './HomeUser'
import Profile from './Profile'
import DetailProduct from './DetailProduct'
import Cart from './Cart'

import AddProduct from './AddProduct'
import AddTopping from './AddTopping'
import Transaction from './Transaction'

import Logout from './Logout'

// import Payment from './Payment'

// import HistoryPayment from './HistoryPayment'



// import PrivateRouteAdmin from './PrivateRouteAdmin'


import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



const PrivateRoute = () => {
  const [state, dispatch] = useContext(UserContext)

  return (
<>
        { (state.user.fullName === 'Admin') ? <>
          <Route exact path="/add-topping" component={ AddTopping } />
          <Route exact path="/add-product" component={ AddProduct } />
          <Route exact path="/transaction" component={ Transaction } />
          <Route  path="/" exact component={ HomeUser } />
          <Route exact path="/logout" component={ Logout } /> 
          </>
        :
        <>       
        <Route exact path="/logout" component={ Logout } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/profile" component={ Profile } /> 
        <Route exact path="/detail-product/:id" component={ DetailProduct } /> 
        <Route  path="/" exact component={ HomeUser } />
        </>
 
    }
</>
  )
}

export default PrivateRoute
