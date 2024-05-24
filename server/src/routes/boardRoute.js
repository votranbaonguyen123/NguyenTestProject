const { Router } = require('express');
const boardController = require('../controllers/boardController')
const cardController = require('../controllers/cardController')

const boardRouter = Router()

boardRouter.route('/').get(boardController.findAllBoard)
boardRouter.route('/').post(boardController.createBoard)
boardRouter.route('/:id').get(boardController.findOneBoard)
boardRouter.route('/:id').patch(boardController.updateBoard)
boardRouter.route('/:id').delete(boardController.deleteBoard)


boardRouter.route('/:boardId/cards').post(cardController.createCard)

module.exports = {
    boardRouter
}