const bcrypt = require('bcrypt')
const {user} = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    
    try {        

        const { email, password, fullName } = req.body
        const data = req.body        

        const schema = joi.object({
            fullName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        }).validate(data)

        if(schema.error){
            return res.send({
                status: 'failed',
                message: schema.error.details[0].message
            })
        }
        
        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        if(checkEmail) {
            return res.send({
                status: 'Failed',
                message: 'Email Already Registered'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
     
        const dataUser = await user.create({
            ...data,
            password: hashPassword
        })
        

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({ 
            id: dataUser.id
        }, secretKey)

        const dataBody = {  
            fullName: fullName,
            token: token
        }

        res.send({
            status: 'success',
            message: 'Regiter success',
            data: {
                user: dataBody
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
exports.login = async (req, res) => {
    
    try {

        const { email, password } = req.body

        if(!email ){
            return res.send({
                status: 'failed',
                message: "Email could'nt empty"
            })
        }

        if(email) {
            data = await user.findOne({
                where: {
                    email
                }
            })
        } else {
            return res.send({
                status: 'Failed',
                message: 'Email or password wrong!'
            })
        }
        
        if(!data){
            return res.send({
                status: 'Failed',
                message: `Email or password wrong!`
            })
        }
        
        const hashPassword = await bcrypt.compare(password, data.password)

        if(!hashPassword){
            return res.send({
                status: 'failed',
                message: `Email or password wrong!`
            })
        }

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({
            id: data.id
        }, secretKey)
    
        const dataBody = {
            message: 'success',
            fullName: data.fullName,
            image: data.image,
            email: email,
            token: token
        }
    
        res.status(200).send({
            status: 'success',
            data: {
                user: dataBody
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

exports.getUsers = async (req, res) => {

    try {
        
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },   
        })

        res.send({
            status: 'success',
            data: {
                users : users
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

exports.deleteUser = async (req, res) => {

    try {

        const { id } = req.params

        const check = await user.findOne({
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

        await user.destroy({
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

exports.editUser = async (req, res) => {
    try {
        const { body } = req
        // const { idUser } = req
        const { idUser } = req
        // console.log(req.body)
        let image = null;

        if(req.files.imageFile) {
            image = req.files.imageFile[0].filename;
        } else if (!image) {
            const result = await user.findOne({
                where : {
                    id : idUser.id
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
        const updateData = await user.update(joinData, {
            where : {
                id : idUser.id
            }
        });

        const dataUpdate = await user.findOne({
            where : {
                id : idUser.id
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