const crudFactory = require('./crudFactory')


const createBoard = crudFactory.createOne('boards')
const findOneBoard = crudFactory.findOne('boards')
const findAllBoard = crudFactory.findAll('boards')
const updateBoard = crudFactory.updateOne('boards')
const deleteBoard = crudFactory.deleteOne('boards')


module.exports = {
    createBoard,
    findOneBoard,
    findAllBoard,
    updateBoard,
    deleteBoard
};