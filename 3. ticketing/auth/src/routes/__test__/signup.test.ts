import  request  from "supertest";
import { app } from "../../app";

it('returns a 201 on succesful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);
    
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'aafadada'
        })
        .expect(400);
});

it('disallows duplicate emails', async () =>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after a succesful signup', async () =>{ // it will fail becuase cookie only sends itself when making https request and
    const response = await request(app)                   // in this case we are making an http request
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})