import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { ticketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

stan.on('connect', () => {
    console.log('Listener connected to NATS')

    stan.on('close', () => {
        console.log('NATS connection closed!')
        process.exit();
    })

    // const options = stan.subscriptionOptions() // this is how we set options 
    //     .setManualAckMode(true) // try to prevent lost data, re send the data if the publisher does not receive sonething that said that everything is ok
    //     .setDeliverAllAvailable() // list all the events emited in the past, but could be a lot...
    //     .setDurableName('accounting-service'); // create a list of events but take into account the processed events
    
    // const subscription = stan.subscribe(
    //     'ticket:created', 
    //     'queue-group-name',
    //     options
    //     ); // first argument: channel, second argument: group of listener (try to an event only reach one of this instances) 

    // subscription.on('message', (msg: Message) => {
    //     console.log('Message recived');
    //     const data = msg.getData();
    //     if(typeof data === 'string'){
    //         console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    //     }

    //     msg.ack(); // use to tell publisher that everything is ok

    // })

    new ticketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


