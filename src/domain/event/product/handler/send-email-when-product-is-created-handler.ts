import { EventHandlerInterface } from '../../shared/event-handler-interface';
import { EventInterface } from '../../shared/event-interface';

export class SendEmailWHenProductIsCreatedHandler implements EventHandlerInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: EventInterface): void {
    console.log('Sending email to ....');
  }
}
