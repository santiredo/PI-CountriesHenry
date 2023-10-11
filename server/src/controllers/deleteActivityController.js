const {Activity} = require('../db')


const deleteActivityController = async(id, UserId) => {

    const deletedActivity = await Activity.findOne({
        where:{
            id,
            UserId
        }
    })

    await deletedActivity.destroy()

}

module.exports = deleteActivityController