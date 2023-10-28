export enum OrderStatus {
    Created = 'created', // when order has been created, but the ticket that it is trying to order has not been reserved
    Cancelled = 'cancelled', // the order is trying to reserve has already been reserved, or when the user has cancelled the order or the order expires before payment
    AwaitingPayment = 'awaiting:payment', // The order has successfully reserved the ticket
    Complete = 'complete' // the order has reserved the ticket and the user has provided payment 
}