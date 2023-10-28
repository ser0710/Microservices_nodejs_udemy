import { Subjects, Publisher, ExpirationCompleteEvent } from '@ser0710_tic/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}