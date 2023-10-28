import { Subjects } from "./subjects";

export interface ticketCreatedEvent {
    subject: Subjects.ticketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}