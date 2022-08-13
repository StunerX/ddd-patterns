import { EventHandlerInterface } from '@src/domain/shared/event/event-handler-interface';
import { EventInterface } from '@src/domain/shared/event/event-interface';

export class SendEmailWHenProductIsCreatedHandler implements EventHandlerInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: EventInterface): void {
    console.log('Sending email to ....');
  }
}
