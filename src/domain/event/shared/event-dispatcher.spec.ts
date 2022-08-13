import { SendEmailWHenProductIsCreatedHandler } from '../product/handler/send-email-when-product-is-created-handler';
import { ProductCreatedEvent } from '../product/product-created-event';
import { EventDispatcher } from './event-dispatcher';

describe('Domain events tests', () => {
  test('should register an event handler', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWHenProductIsCreatedHandler();

    dispatcher.register('ProductCreatedEvent', eventHandler);

    expect(dispatcher.getEventHandlers()['ProductCreatedEvent']).toBeDefined();
    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'].length).toBe(1);
    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'][0]).toEqual(eventHandler);
  });

  test('should unegister an event handler', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWHenProductIsCreatedHandler();

    dispatcher.register('ProductCreatedEvent', eventHandler);

    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'][0]).toEqual(eventHandler);

    dispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'].length).toBe(0);
  });

  test('should unegister all event handlers', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWHenProductIsCreatedHandler();

    dispatcher.register('ProductCreatedEvent', eventHandler);

    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'][0]).toEqual(eventHandler);

    dispatcher.unregisterAll();
    expect(dispatcher.getEventHandlers()['ProductCreatedEvent']).toBeUndefined();
  });

  test('should notify all event handlers', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWHenProductIsCreatedHandler();

    const spyHandle = jest.spyOn(eventHandler, 'handle');

    dispatcher.register('ProductCreatedEvent', eventHandler);

    expect(dispatcher.getEventHandlers()['ProductCreatedEvent'][0]).toEqual(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: '#1',
      name: 'product 1'
    });

    dispatcher.notify(productCreatedEvent);

    expect(spyHandle).toBeCalled();
  });
});
