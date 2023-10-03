import buildClient from "../api/build-client"

const Landing = ({ currentUser }) => {
    // console.log(currentUser);
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // })
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
}
Landing.getInitialProps = async (context) => {
    // if(typeof window === 'undefined') {
    //     // we are on the server, request to... ?
    //     const { data } = await axios.get('http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/currentuser', { // url to make a request inside the cluster 
    //         headers: {
    //             Host: req.headers
    //         }
    //     }).catch((err) => { // in cmd kubectl get namespace ... kubectl get services -n ingress-nginx
    //         console.log(err.message)
    //     })
    //     return data;
    // }else {
    //     // we are on browser, request to https://ticketing.dev/api/users/currentuser ?
    //     const { data } = await axios.get('/api/users/currentuser').catch((err) => {
    //         console.log(err.message)
    //     })
    //     return data;
    // }
    const { data } = await buildClient(context).get('/api/users/currentuser');
    return data;
}
export default Landing;