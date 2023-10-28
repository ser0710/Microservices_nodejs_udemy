import { Publisher, Subjects, TicketUpdatedEvent } from '@ser0710_tic/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}