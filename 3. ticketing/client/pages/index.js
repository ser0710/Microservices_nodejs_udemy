import Link from 'next/Link';

const Landing = ({ currentUser, tickets }) => {

    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                    View
                </Link>
                </td>
            </tr>
        )
    })

    // console.log(currentUser);
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // })
    // return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
}
Landing.getInitialProps = async (context, client, currentUser) => {
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

    // try to dont make the same request twice (this request will be on _app.js)
    // const { data } = await buildClient(context).get('/api/users/currentuser');
    // return data;
    const { data } = await client.get('/api/tickets');
    return { tickets: data };


}
export default Landing;



<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  View
</Link>