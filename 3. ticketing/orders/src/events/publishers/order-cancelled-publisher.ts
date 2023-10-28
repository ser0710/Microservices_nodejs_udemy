import { Publisher, OrderCancelledEvent, Subjects } from '@ser0710_tic/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}