import { Listener } from "./base-listener";
import { Message } from 'node-nats-streaming';
import { ticketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class ticketCreatedListener extends Listener<ticketCreatedEvent> {
    readonly subject = Subjects.ticketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: ticketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data);

        msg.ack();
    }
}