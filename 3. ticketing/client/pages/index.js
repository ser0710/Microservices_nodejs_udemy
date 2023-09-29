import axios from "axios";

const Landing = ({ currentUser }) => {
    console.log(currentUser);
    axios.get('/api/users/currentuser').catch((err) => {
        console.log(err.message);
    })
    return <h1>Landing page</h1>
}
Landing.getInitialProps = () => {
    console.log('hi server');
    return {color: 'red'};
}
export default Landing;