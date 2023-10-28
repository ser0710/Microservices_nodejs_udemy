import { Listener, OrderCreatedEvent, Subjects } from '@ser0710_tic/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../modules/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publihser';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject: Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message){ 
        
        // find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket throw error
        if(!ticket){
            throw new Error('ticket not found');
        }

        // mark ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id })

        // save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });

        // ack the message
        msg.ack();
    }
}