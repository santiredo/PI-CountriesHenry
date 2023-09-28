const {Activity} = require('../db')


const deleteActivityController = async(id) => {

    const deletedActivity = await Activity.findByPk(id)

    await deletedActivity.destroy()

}

module.exports = deleteActivityController