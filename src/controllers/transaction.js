const { user, product, topping, qty, transaction, transactionProduct, transactionTopping } = require('../../models')
const joi = require('joi')

const { success, failed, messageSuccess, messageFailed, messageEmpty } = {
	success: 'success',
	failed: 'failed',
	messageSuccess: (type, id) =>
		`${type} Transaction/s success${id ? ` id : ${id}` : ``}`,
	messageFailed: (type, id) =>
		`${type} Transaction/s fail${id ? ` id : ${id}` : ``}`,
	messageEmpty: `No data found`,
};

//* Re-Useable Error response
const errorResponse = (err, res) => {
	console.log(err);
	res.status(500).send({ error: { message: 'Server Error' } });
};

// exports.addTransaction = async (req, res) => {

//     try {
//         // const{ id } = req.body
//         // const data = req.body
//         // const { toppings } = req.body 
//         const { body, idUser }= req

//         const buildTransaction = {
//           ...body,
//           userId : idUser,
//           // attachment: null,
//         }

//         console.log(buildTransaction)
//         const createTransaction = await transaction.create( buildTransaction,
//           {
//                 include:[ 
//                   {
//                     association: 'productOrder',
//                   // model: transaction,
//                   // as: 'transaction',
//                   // attributes: {
//                   //     exclude: [ 'createdAt', 'updatedAt']
//                   // },
//                   // include: 
//                 //     {
//                 //     model: product,
//                 //     as: 'productOrder',
//                 //     attributes: {
//                 //         exclude: [ 'createdAt', 'updatedAt']
//                 //     },
//                     include: 
//                     {
//                 //     model: topping,
//                       association: 'toppingOrder',
//                 //     attributes: {
//                 //         exclude: [ 'createdAt', 'updatedAt']
//                     }
//                 //   }
//                 // }
//               }
//             ]
//       })

    
//       //   const createTransaction = await transaction.create({ 
//       //     userId: findUser,
//       //     userIdis: findUser,
//       //     status: "Success",
//       //     // order: dataUpload
//       // })
      
//         res.send({
//           status: 'on the way',
//           data :{
//               transaction: createTransaction,
//               // {
//               // userOrder: findUser,
//               status: "Succes"
//               // order: 
//               // }
//           }
//         })
      
//   } catch (err) {
        
//         console.log(err)
//         res.status({  
//             status: 'failed',
//             message: 'Server Error'
//         })

//     }

// }


exports.addTransaction = async (req, res) => {
	try {
    
		const { transactionProductId,  } = req.body;
		const { transactionId,chooseToppingId, productId } = req.body;
    const data = req.body       

		const { body } = req;
		const userId = req.idUser.id;

    const transactionToppingData = {
			...data,
      transactionProductId:productId,
      toppingId:chooseToppingId
		};


		// const transactionData = {
		// 	// ...body,
		// 	userId,
		// };

		// console.log(transactionData);

		// const transactions = await transaction.create(transactionData);

    const transactionsToppings = await transactionTopping.create(transactionToppingData, 
      {
      // include:{
      // model: transactionProduct,
      // as: 'orderTopping',
      // attributes: {
      //   exclude: [ 'createdAt', 'updatedAt']
      //   },
      // },

      });
    
    // const transactionProductData = {
		// 	transactionId:transactions.id,
    //   productId:transactionsToppings.id
		// };


    // const transactionsProducts = await transactionProduct.create(transactionProductData);

    const findTopping = await transactionTopping.findOne(
    {  
      where: {
        id: transactionsToppings.id
      },
    include:{
    model: topping,
    as: 'topping',
    attributes: {
      exclude: [ 'createdAt', 'updatedAt']
      },
    },
    // include:{
    //   model: transactionProduct,
    //   as: 'orderTopping',
    //   attributes: {
    //     exclude: [ 'createdAt', 'updatedAt']
    //     },
    //   },
    }
  )

  // const findProduct = await transactionProduct.findOne(
  //   {  
  //     where: {
  //       id: transactionsProducts.id
  //     },
  // include:{
  //   model: product,
  //   as: 'productOrder',
  //   attributes: {
  //     exclude: [ 'createdAt', 'updatedAt']
  //     },
  //   },
  //   include:{
  //     model: transaction,
  //     as: 'orderProduct',
  //     attributes: {
  //       exclude: [ 'createdAt', 'updatedAt']
  //       },
  //     },
  //   }
  // )

    // const transactionproduct = {
		// 	...body, 
    //   transactionId: transactions.id,
    //   productId:findProduct.id
		// 	// attachment: null
		// };
    // const transactionProducts = await transactionProduct.create(transactionproduct);

  //   const findTransaction = await transaction.findOne( 
  //     {
  //       where: {
  //         id: transactions.id
  //       },
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt']
  //       }, 
  //         include:{
  //               model: user,
  //               as: 'user',
  //               attributes: {
  //                 exclude: [ 'createdAt', 'updatedAt']
  //               },
  //             },
  //   },
  // )
    // console.log(findTransaction)
		res.send({
			// status: 'success',
			// message: messageSuccess('Add'),
			data: {
				transaction: findTopping
			},
		});
	} catch (err) {
		return errorResponse(err, res);
	}
};




























































const getFollowers = async (req, res) => {
    try {
      const { id } = req.params
      const account = await user.findOne({ where: { id: id } })
      if (!account) {
        return res.status(404).send({
          status: 'failed',
          message: 'user not found'
        })
      }
      const followers = await follows.findAll({
        where: {
          followingId: id
        },
        attributes: [['followingId', 'id']],
        include: {
          model: user,
          as: 'followers',
          attributes: { exclude: except }
        }
      })
      const userFollow = followers.map((f) => ({
        id: f.id,
        user: f.followers
      }))
      res.status(200).send({
        status: 'success',
        data: {
          followers: userFollow
        }
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).send({
        status: 'failed',
        message: 'server error'
      })
    }
  }
  

  
        // const produc =  await product.findOne({        
        //     where: {
        //     id: id
        //   },
        //   attributes: {
        //     exclude: ['createdAt', 'updatedAt']
        //   }, 
        //   // include: {
          //   model: topping,
          //   as: 'topping',
          //   attributes: {
          //     exclude: ['createdAt','updateAt', 'email', 'bio', 'password']
          //   }
          // }
            // id: id,
            // topping: toppings

        // console.log(req.body)


        // const dataUpload = {
        //     ...data,
        //     products: produc
        // }

        // const schema = joi.object({
        //     products: {
        //         id: joi.number().required(),
        //         qty: joi.number().required(),
        //         toppings: joi.number().allow('') 
        //     }
        // }).validate(data)
    
        // if(schema.error){
        //     return res.send({
        //         status: 'failed',
        //         message: schema.error.details[0].message
        //     })
        // } 

        // const dataProduct = await transaction.create()
    



        // const findProduct = await product.findOne(
        //     {
        

        // })

 
 
        // const findTopping = await topping.findAll(
        //     {
        //         where: {
        //             id: id
        //         },
        //         attributes: {
        //             exclude: ['createdAt', 'updatedAt']
        //         }, 

        // })

    


   

        // const createProduct = await product.create ( data )

