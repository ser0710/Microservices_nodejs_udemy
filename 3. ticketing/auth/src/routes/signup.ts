import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import  jwt  from 'jsonwebtoken';
import { validateRequest,BadRequestError  } from '@ser0710_tic/common';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max:20})
        .withMessage('Passowrd must be between 4 and 20')
], 
validateRequest,
async (req: Request, res: Response) => {
    // const errors = validationResult(req); // code that repeats in other routes, we change it by adding the validateRequest call
    // if(!errors.isEmpty()){
    //     // only for JS land (not ts)
    //     // const error = new Error('Invalid email or password');
    //     // error.reasons = errors.array();
    //     // throw error;
    //     throw new RequestValidationError(errors.array());
    // }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
        throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, password });
    await user.save();
    
    // generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!); // Typescript is never going to asume that the env is define the, ! ignores the error 


    // store it on session object

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };