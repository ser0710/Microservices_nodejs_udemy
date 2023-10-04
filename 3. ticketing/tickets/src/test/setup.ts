import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import  request  from "supertest";
import jwt from 'jsonwebtoken';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri =  mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () =>{
    if(mongo){
        await mongo.stop();
    }
    await mongoose.connection.close();
})

declare global {
    var signin: () => string[];
}

global.signin = () => {
    // build a JWT payload { id, email }

    const payload = {
        id: 'dasjkajkd',
        email: 'aaa@aaa.com'
    };

    // create the JWT

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session object { jwt: my_jwt }

    const session = { jwt: token }

    // turn that session into JSON

    const sessionJSON = JSON.stringify(session);

    // take JSON and encode it as base64

    const base64 = Buffer.from(sessionJSON).toString('base64')

    // return a string thats the cookie with the encoded data

    return [`session=${base64}`];
}