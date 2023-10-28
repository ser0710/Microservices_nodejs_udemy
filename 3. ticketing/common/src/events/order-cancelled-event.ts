import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: { // we could share more info but actually it isn't necessary 
        id: string;
        version: number;
        ticket: {
            id: string;
        }
    }
}