const { user, product, topping, qty, like } = require('../../models')
const joi = require('joi')

exports.addTopping = async (req, res) => {

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
            price: joi.number().required(),
        }).validate(data)

        if(schema.error){
            return res.send({
                status: 'failed',
                message: schema.error.details[0].message
            })
        }

        const createTopping = await topping.create ( dataUpload )

        const findTopping = await topping.findOne(
            {
                where: {
                    id: createTopping.id
                  },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }, 

        })
        res.send({
            status: 'success',
            data: {
                    id: findTopping
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
exports.getToppings = async (req, res) => {

    try {
        
        const toppings = await topping.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },   
        })

        res.send({
            status: 'success',
            data: {
                toppings : toppings
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
exports.getTopping = async (req, res) => {

    try {
        const { id } = req.params

        const toppings = await topping.findOne({
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
                toppings : toppings
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
exports.editTopping = async (req, res) => {
    try {
        const { body } = req
        // const { idUser } = req
        const { id } = req.params
        console.log(req.body)
        let image = null;

        if(req.files.imageFile) {
            image = req.files.imageFile[0].filename;
        } else if (!image) {
            const result = await topping.findOne({
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
        await topping.update(joinData, {
            where : {
                id : id
            }
        });



        const dataUpdate = await topping.findOne({
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
exports.deleteTopping = async (req, res) => {

    try {

        const { id } = req.params

        const check = await topping.findOne({
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

        await topping.destroy({
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


