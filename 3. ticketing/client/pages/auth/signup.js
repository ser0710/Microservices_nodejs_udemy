import { useState } from 'react';
// import axios from 'axios';
import use_request from '../../hooks/use-request';
import Router from 'next/router';

const signup = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    // const [errors, setErrors] = useState([]);
    const { doRequest, errors } = use_request({
        url: '/api/users/signup', // if running on docker change the link for /api/users/signup https://ticketing.dev/api/users/signup
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        
        doRequest();
        // try{
        //     const response = await axios.post('https://ticketing.dev/api/users/signup', { // if running on docker change the link for /api/users/signup
        //         email, password
        //     })
        //     console.log(response.data)
        // }catch(err){
        //     setErrors(err.response.data.errors);
        // }
        
    }

    return (
    <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={e => setpassword(e.target.value)} type="password" className="form-control"></input>
        </div>
        {errors}
        {/* {errors.length > 0 && <div className='alert alert-danger'>
            <h4>Ooopss....</h4>
            <ul className='my-0'>
                {errors.map(err => <li key={err.message}>{err.message}</li>)}
            </ul>
        </div>} */}
        <button className="btn btn-primary">Sign up</button>
    </form>
    );
}

export default signup;