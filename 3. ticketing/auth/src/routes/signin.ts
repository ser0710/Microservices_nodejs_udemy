import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Passowrd } from '../services/password';
import  jwt  from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], 
validateRequest,
async (req: Request, res: Response) => {
    // const errors = validationResult(req); // same as signup file
    // if(!errors.isEmpty()){
    //     throw new RequestValidationError(errors.array());
    // }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Passowrd.compare(existingUser.password, password);
    if(!passwordsMatch){
        throw new BadRequestError('Invalid credentials');
    }

    // generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!); // Typescript is never going to asume that the env is define the, ! ignores the error 


    // store it on session object

    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter };