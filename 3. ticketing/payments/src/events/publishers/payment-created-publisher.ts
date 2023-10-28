import { Subjects, Publisher, PaymentCreatedEvent } from '@ser0710_tic/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}