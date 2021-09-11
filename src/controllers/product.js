const { user, product, topping, qty, like } = require('../../models')
const joi = require('joi')

exports.addProduct = async (req, res) => {

    try {
        const data = req.body
  
        const dataUpload = {
            ...data,
        }
         
        if (req.files.imageFile) {
         dataUpload ["image"] = req.files.imageFile[0].filename
        }
    
        const schema = joi.object({
            title: joi.string().required(),
            price: joi.number().allow(''),
        }).validate(data)

        if(schema.error){
            return res.send({
                status: 'failed',
                message: schema.error.details[0].message
            })
        }

        const createProduct = await product.create ( dataUpload )

        const findProduct = await product.findOne(
            {
                where: {
                    id: createProduct.id
                  },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }, 
                  

        })
        res.send({
            status: 'success',
            data: {
                    id: findProduct
                }
            
        })
        
    } catch (err) {
        
        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })

    }

}
exports.getProducts = async (req, res) => {

    try {
        
        const products = await product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },   
        })

        res.send({
            status: 'success',
            data: {
                products : products
            }
        })

    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })

    }
}
exports.getProduct = async (req, res) => {

    try {
        const { id } = req.params

        const products = await product.findOne({
            where : {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },   
        })

        res.send({
            status: 'success',
            data: {
                products : products
            }
        })

    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })

    }
}

exports.editProduct = async (req, res) => {
    try {
        const { body } = req
        // const { idUser } = req
        const { id } = req.params
        console.log(req.body)
        let image = null;

        if(req.files.imageFile) {
            image = req.files.imageFile[0].filename;
        } else if (!image) {
            const result = await product.findOne({
                where : {
                    id : id
                },
                attributes: ['id', 'image'],
            });

            image = result.image
        }

        const joinData = {
            ...body,
            image,
        };

        console.log(joinData)
        const updateData = await product.update(joinData, {
            where : {
                id : id
            }
        });

        const dataUpdate = await product.findOne({
            where : {
                id : id
            },
            attributes: {
                exclude: ['createAt', 'updateAt', 'password']
            }
        });

        res.send({
            status : "success",
            message : "Data successfully updated",
            data : {
                user : dataUpdate
            },
        });

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}
exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params

        const check = await product.findOne({
            where: {
                id
            }
        })

        if(!check){
            return res.send({
                status: 'failed',
                message: `User with id ${id} not found`
            })
        }

        await product.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            
            data: {
                id: check.id
            }
        })
        
    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })

    }
}




