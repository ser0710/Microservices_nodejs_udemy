import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async (title: string) => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString()
        title: title,
        price: 20
    })
    await ticket.save();
    return ticket;
}

it('fetches orders for a particular user',async () => {
    // create 3 tickets
    const ticketOne = await buildTicket('Concert');
    const ticketTwo = await buildTicket('Game');
    const ticketThree = await buildTicket('asjkdasf');

    const userOne = signin();
    const userTwo = signin();

    // create one order as User #1
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ TicketId: ticketOne.id })
        .expect(201);

    // create two order as User #2
    const { body: order1 } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ TicketId: ticketThree.id })
        .expect(201);
    const { body: order2 } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ TicketId: ticketTwo.id })
        .expect(201);

    // make request to get orders for User #2
    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    // Make sure we only got the orders for user #2
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(order1.id);
    expect(response.body[1].id).toEqual(order2.id);
})