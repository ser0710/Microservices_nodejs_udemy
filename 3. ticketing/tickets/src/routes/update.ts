import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { Ticket } from '../modules/ticket';
import { NotFoundError, validateRequest,requireAuth,notAuthorizedError } from '@ser0710_tic/common';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({gt:0})
        .withMessage('Price must be provided and greater than 0')
], 
validateRequest,
async (req:Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }
    if(ticket.userId !== req.currentUser!.id){
        throw new notAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();

    res.send(ticket);
})

export { router as updateTicketRouter };