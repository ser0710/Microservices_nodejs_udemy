import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        // .get('/api/tickets/sfndjklfnksdnjsdf') // this id sfndjklfnksdnjsdf will throw an error because mongo wont recognize the id 
        .send()
        .expect(404);
})

it('returns the ticket if the ticket is found', async () => {
    const tittle = 'concert';
    const price = 20;
    
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            tittle: tittle,
            price: price
        })
        .expect(201);

    const ticketRes = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketRes.body.title).toEqual(tittle)
    expect(ticketRes.body.price).toEqual(price)
})