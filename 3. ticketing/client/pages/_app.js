// global properties 
import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';
import Header from '../components/header';

const styles = ({ Component, pageProps, currentUser }) => {
    return(
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
        
    ) 
}

styles.getInitialProps = async context => { // putting this here makes that the others getInitialProps did not get executed
    const client = buildClient(context.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {};
    if(context.Component.getInitialProps){
        pageProps = await context.Component.getInitialProps(context.ctx); // call the other getInitialProps from the different components
    }
    

    return {
        pageProps,
        ...data
    };
};

export default styles;