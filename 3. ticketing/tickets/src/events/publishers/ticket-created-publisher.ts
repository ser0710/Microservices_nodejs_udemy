import { Publisher, Subjects, TicketCreatedEvent } from '@ser0710_tic/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}

