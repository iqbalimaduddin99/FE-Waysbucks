const { user } = require('../../models')

exports.checkAuth = async (req,res) => {
    try {

        console.log (req.idUser)

        const { id } = req.idUser

        const dataUser = await user.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
    
        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }


        res.send({
            status: 'success',
            data: {
               user: dataUser
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

