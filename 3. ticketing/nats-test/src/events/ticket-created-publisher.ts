import { Publisher } from "./base-publisher";
import { ticketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<ticketCreatedEvent> {
    readonly subject = Subjects.ticketCreated;
    
}