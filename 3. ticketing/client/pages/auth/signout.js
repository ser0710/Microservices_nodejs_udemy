import { useEffect } from "react";
import use_request from '../../hooks/use-request';
import Router from "next/router";

const signout = () =>{
    const { doRequest } = use_request({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        doRequest();
    }, []);
    
    return <div>signing you out...</div>

}

export default signout;