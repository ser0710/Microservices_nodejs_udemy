import express, {Request, Response} from 'express';
import { Ticket } from '../modules/ticket';

const router = express.Router();

router.get('/api/tickets',async () => {
    const tickets = await Ticket.find({});

    res.send(tickets);
})

export { router as indexTicketRouter };