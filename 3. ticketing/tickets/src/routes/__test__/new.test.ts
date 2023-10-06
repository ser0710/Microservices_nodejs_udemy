import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../modules/ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});
    expect(response.status).not.toEqual(404);
})

it('can only be access if user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
})

it('return a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({});
    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid tittle is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: '',
            price: '10'
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            price: 10
        })
        .expect(400);  
})

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: 'jkfjdf',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            tittle: 'jknfkndsf'
        })
        .expect(400); 
})

it('creates a ticket with a valid inputs', async () => {
    // add a check to make sure a ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    const tittle = 'fjnndjk';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: tittle,
            price: 20
        })
        .expect(201);
    
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(tittle);
})