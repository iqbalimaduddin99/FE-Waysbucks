import { useContext, useEffect, useState } from 'react'
import '../css/AddProduct.css'
import '../css/DetailProduct.css'
import { Alert, Form, Button, Row, Card, Col, Container} from 'react-bootstrap'
// import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../config/api'
import { useHistory, useParams } from 'react-router'

import CardToping from '../atoms/CheckTopping'


const AddProduct = () => {
  const [product, setProduct] = useState()
  const [products, setProducts] = useState()  
  const [toppings, setToppings] = useState()
  
  const [final, setFinal] = useState()
  const [idTopping, setTopping] = useState()
  const [clickIdTopping, setIdTopping] = useState()
  const [ isCheck, setCheck ] = useState(false)

  const history = useHistory()
  const image = 'http://localhost:1000/public/image/'
  let { id } = useParams();

  
  const handleCheckClick = (idTop) => {
    // handleidTopping()
    console.log(idTop)
    
    // console.log(clickIdTopping)
    let data = clickIdTopping.find((item) => item.id == idTop)
    console.log(data)
    getTopping(idTop)
    // click berdasarkan id topping
  }


  const getTopping = async (idTop) => {
    try {	
      const res = await API.get(`/topping/${idTop}`)
      
      console.log(res) 
       if (res.data.status === "success") {
        setCheck(!isCheck)
      } else {
        setCheck(isCheck)
      }
      // setTopping(res.id)

    } catch (error) {
      console.log(error?.response)
    } 
    // finally {
    //   setLoading('')
    // }
  }
 
  useEffect(() => {
    getProducts()
}, [id])

  const getProducts = async () => {
    try {	
      const res = await API.get(`/product/${id}`)
      
      console.log(res)
      setProduct(res.data.data.products)
      console.log(res.data.data.products)

    } catch (error) {
      console.log(error?.response)
    } 
    // finally {
    //   setLoading('')
    // }
  }

  useEffect(() => {
    getToppings()
    return () => setToppings()
  }, [])

  const getToppings = async () => {
    try {	
      const res = await API.get('/toppings')
      setIdTopping(res.data.data.toppings)
      setToppings(res.data.data.toppings)
    } catch (error) {
      console.log(error?.response)
    } 
    // finally {
    //   setLoading('')
    // }
  }

  return (
<main>
  
<div className="product">
    <h2 className="dp-product">{product?.title}</h2>
    <p className='dp-text-price'>Rp. {product?.price}</p>
<p className='dp-text-topping'>Topping</p>
  <div>
     <img className="dp-product-img" src={image + product?.image} />
  </div>
</div>

<section className='dp-topping'>
<Container>
  <Row>
      { toppings?.map((topping) => (
        <Col lg={3}  >        
          <div>  
            <p className="dp-price">Rp. {topping.price}</p>
            {/* <div  key={i}  onClick={()=>{handleCheckClick(topping.id)}} >
             </div> */}
            <CardToping topping={topping}  />
            {/* <p className='dp-text-tp'>{ bikin_handle_itung} </p> */}
          </div>
        </Col>
      ))
    }
  </Row>
</Container>   

<p className="dp-total">Total</p>
<p className="dp-total-price"> Rp. Total Price</p>
<Button className="submit-dp" type="submit">
        Add Cart
</Button>
</section>

</main>
  )
}

export default AddProduct


























// const [love, setLove] = useState(feeds.like);
// const [isLike, setLike] = useState(false);

// useEffect(() => {
//   setTimeout(() => {
//     cekLike(); 
//   }, 2500);
  
//   return () => {
//     setLikes([]);
//   }
// }, []);

// const cekLike = () => {
//   const result = likes.find((like) => like.feedId === feeds.id)
//   if (result) {
//     setLike(true);
//   } else {
//     setLike(false);
//   }
// }

// const countLike = async (id) => {
//   try {
//     const like = await API.get(`/feed-like/${id}`);
//     console.log(like?.data.data.feed.like);
//     setLove(like?.data?.data?.feed?.like);
//   } catch (error) {
//     console.log(error)
//     console.log(error?.response);
//   }
// }


// const handleLike = async () => {
//   try {
//     const body = JSON.stringify({ id: feeds?.id });
//     const headers = {
//       headers: { 'Content-Type': 'application/json' }
//     }
//     const response = await API.post('/like', body, headers);
//     checkLike(feeds?.id);
//   } catch (error) {
//     console.log(error?.response);
//   }
// }

// const checkLike = async (id) => {
//   try {
//     const response = await API.get(`/like/${id}`);
//     console.log(response?.data);
//     if (response?.data?.message === 'like not found') {
//       setLike(false);
//     }
//     if (response?.data?.message === 'success like') {
//       setLike(true);
//     }
//     countLike(id);
//   } catch (error) {
//     setLike(false);
//     console.log(error?.response?.status);
//   }

// const path = 'http://localhost:5000/uploads/';
// 	const [state, dispatch] = useContext(UserContext);
// 	const { id } = state.user; 
// 	const { uid } = props;
// 	const isLike = false;
// 	const [show, setShow] = useState(false);
// 	const [feeds, setFeeds] = useState();
// 	const [send, setSend] = useState();
// 	const [likes, setLikes] = useState(); 


// 	const getFeedFollow = async (uid) => {
// 		try {
// 			const response = await API.get(`/feeds/${uid}`);
// 			const responseLike = await API.get('/likes');
// 			setLikes(responseLike?.data?.data?.like);
// 			console.log(response?.data?.data?.feeds);
// 			setFeeds(response?.data?.data?.feeds);
// 		} catch (error) {
// 			console.log(error?.response);
// 		}
// 	}

// 	useState(() => {
// 		getFeedFollow(uid);
// 	}, [uid]);
	
// 	const handleLike = () => console.log('oke')
// 	const handleDetailFeed = () => console.log('oke')













    // useEffect(() => {
    //   getProduct()
    //   // return () => setProduct()
    // }, [])
  
    // const getProduct = async (id) => {
    //   try {
    //     const res = await API.get(`/product/${id}`)
        
    //     console.log(res)
    //     // setProduct(res.data.data.toppings)
  
    //   } catch (error) {
    //     console.log(error?.response)
    //   } 
    // }







	// let product;
			// if (localStorage.getItem('product')===null)
			// { product = [] }
			// else
			// { product = JSON.parse(localStorage.getItem('product')) }
			// product.push(input);	
			// localStorage.setItem('product',JSON.stringify(product));

      
  // const [input, setInput] = useState({
  //   NameProduct: '', Price: '', PhotoProduct: ''
  // })


  // const onChangeInput = (e) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]:  e.target.value
  //   })
  //   if(e.target.type === "file"){
  //     let url = URL.createObjectURL(e.target.files[0])
  //     setPreview(url)
  // }

  // }
  	// const onSubmitProduct = async (e) => {
    // 	e.preventDefault()
    // 	try {
      
    // 		setInput({ NameProduct: '', Price: '', PhotoProduct: ''})
    //     setError(     ['danger'].map((variant, idx) => (
    //       <Alert key={idx} variant={variant}>
    //         Add Product Succes  
    //       </Alert>
    //     )))
    // 	} catch (error) {
    //       console.log(error.message)
    // 	}
    // }